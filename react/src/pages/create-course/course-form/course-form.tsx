import { FC, memo, useState, useEffect } from 'react';
import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import { generatePath, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';

import { CourseFormValues } from './course-form-interfaces';
import {
  DropFileLoaderField,
  NestedField,
  SelectCategoryField,
  SelectField,
  UrlField,
} from '~/components/forms/fields';
import { EPlugin, FIELD_SPACING, TOAST_STATUS } from '~/common/constants';
import { scrollToError } from '~/helpers/form';
import { ServerError } from '~/models';
import { useApi, useTranslate } from '~/services';
import { useErrorToastOptions, useHasPluginsOrAddons, useNewCoursePage, useGetUserInfo } from '~/common/hooks';
import { useToast } from '~/components/toast';
import { validationSchema } from '~/common/validation-schemes';
import { UnlockAddons } from '~/components/unlock-addons';
import { ReactComponent as BannerCloseIcon } from '~/assets/icons/close-icon.svg';

export const CourseForm: FC = memo(() => {
  const api = useApi();
  const toast = useToast();
  const { __ } = useTranslate();
  const navigate = useNavigate();
  const courseNew = useNewCoursePage();
  const createCourse = useMutation(api.course.create, {
    onSuccess: (response) => {
      toast({ message: __('Course has been added successfully'), type: TOAST_STATUS.SUCCESS });
      const path = generatePath('/edit-course/:courseId', { courseId: response.id });
      navigate(path);
    },
    onError: (err: ServerError) => {
      const errorToastOptions = useErrorToastOptions(err, __('Failed to create course'));
      toast(errorToastOptions);
    },
  });

  const isLoading = [createCourse.isLoading, courseNew.isLoading].some(Boolean);

  const formProps = useForm<CourseFormValues>({
    defaultValues: {
      title: '',
      slug: '',
      image: null,
      category: [],
      level: '',
    },
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const createCourseHandler = (values: CourseFormValues) => {
    createCourse.mutate(values);
  };

  const { hasPlugin } = useHasPluginsOrAddons();
  const isProActive = hasPlugin(EPlugin.LMS_PRO);
  const { isAdmin } = useGetUserInfo();

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
    localStorage.setItem('isCreationUnlockBannerClosed', 'true');
  };
  
  useEffect(() => {
    const isModalClosed = localStorage.getItem('isCreationUnlockBannerClosed');
    if (!isModalClosed) {
      setIsOpen(true);
    }
  }, []);
  const shouldRenderUnlockAddons = window.innerWidth > 1024;

  return (
    <Box 
      display='flex'
      justifyContent={ !isProActive ? (window.innerWidth > 1440 ? 'space-evenly' : 'initial') : 'center' }
    >
    <Flex 
      flexDirection="column" 
      alignSelf="center" 
      maxWidth="530px"
      margin={
        (!isOpen || !isAdmin) ? 'auto' : 
        (!isProActive && isOpen && window.innerWidth <= 1440 && isAdmin) ? '0 0 0 240px' : 
        'unset'
      }      
    >
      <FormProvider {...formProps}>
        <form onSubmit={formProps.handleSubmit(createCourseHandler, scrollToError)}>
          <Text color="dark" fontSize="xl" mb="10px">
            {__('Course information')}
          </Text>
          <Text color="dark70" fontSize="sm" mb="20px">
            {__('Fill out basic information about a course to make it attractive to potential students.')}
          </Text>
          <VStack spacing={FIELD_SPACING} align="stretch">
            <NestedField
              name="title"
              label={__('Course name')}
              placeholder={__('Enter course name')}
              nestedFieldName="slug"
            />
            <UrlField
              name="slug"
              label={__('Url:')}
              placeholder={__('Type URL here')}
              prefix={`${courseNew.data.courses_url}/`}
            />
            <SelectCategoryField
              name="category"
              label={__('Category')}
              placeholder={__('Category')}
              categories={courseNew.data ? courseNew.data.categories : []}
              isAllowedCreateCategory={courseNew.data.create_category_allowed || !courseNew.data.is_instructor}
              queryKey={'new-course'}
            />
            <SelectField
              name="level"
              label={__('Level')}
              placeholder={__('Select level')}
              options={courseNew.data ? courseNew.data.levels : []}
            />
            <Box>
              <DropFileLoaderField
                name="image"
                label={__('Image')}
                type="image"
              />
            </Box>
            <Flex justify="flex-end">
              <Button
                variant="primary"
                type="submit"
                m="0"
                isLoading={isLoading}
              >
                {__('Create')}
              </Button>
            </Flex>
          </VStack>
        </form>
      </FormProvider>
    </Flex>
    {!isProActive && isOpen && (
      <Box
        top='20px'
        right='20px'
        bottom='20px'
        position='absolute'
      >
         { shouldRenderUnlockAddons && (
        <UnlockAddons
          addons={[]}
          isHide={true}
          options={true}
          isDark={true}
          description={__(
            'Are you ready to step up your e-learning game? ' +
            'With Premium Addons, the possibilities are endless and right at your fingertips. ' +
            'Don\'t let this chance slip away to turbocharge your courses.'
          )}
          />
          )}
          <Box
            position='absolute'
            top='20px'
            right='20px'
            cursor='pointer'>
            <BannerCloseIcon onClick={onClose} style={{ fill: 'white' }} />
        </Box>
        </Box>
        )}
      </Box>
  );
});