import { FC, memo } from 'react';
import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useOutletContext, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import {
  DatePickerField,
  DropFileLoaderField,
  EditorField,
  NestedField,
  NumberField,
  SelectCategoryField,
  SelectField,
  SwitchField,
  TextareaField,
  TextField,
  UrlField,
} from '~/components/forms/fields';
import { CoInstructorField } from './co-instructor-field';
import { EAddon, EPlugin } from '~/common/constants';
import { deepEqual, getInitialData, scrollToError } from '~/helpers/form';
import { FieldWrapper } from '~/components/field-wrapper';
import { Footer } from '~/components/footer';
import { FormWrapper } from '~/components/form-wrapper';
import { getLink } from '~/helpers/string';
import { MainTabFormValues } from './main-tab-interfaces';
import { Prompt, useBlockerFunction } from '~/components/prompt';
import { Settings } from '~/models';
import { TabContentBlock } from '~/components/tab-content-block';
import { TabHeader } from '~/components/tab-header';
import { useCourseData, useHasPluginsOrAddons, useUnlockBannerState, useGetUnlockAddons } from '~/common/hooks';
import { UserCard } from '~/components/user-card';
import { useTranslate } from '~/services';
import { useUpdateMain } from './main-tab-hooks';
import { validationSchema } from '~/common/validation-schemes';
import { Warning } from '~/components/warning';
import { WithAddon } from '~/components/with-addon';
import { WithPlugin } from '~/components/with-plugin';
import { UnlockAddons } from '~/components/unlock-addons/unlock-addons';

export const MainTab: FC = memo(() => {
  const { courseId } = useParams<{ courseId: string }>();
  if (!courseId) return null;

  const { __ } = useTranslate();

  const COURSE_STATUSES = [
    { id: 'hot', label: __('Hot') },
    { id: 'new', label: __('New') },
    { id: 'special', label: __('Special') },
  ];

  const { hasPlugin } = useHasPluginsOrAddons();
  const { categories, course, levels, featured_quota } = useOutletContext<Settings>();
  const initialData = getInitialData(course, [
    'title',
    'slug',
    'category',
    'level',
    'image',
    'duration_info',
    'video_duration',
    'co_instructor',
    'content',
    'excerpt',
    'status',
    'status_date_start',
    'status_date_end',
    'views',
    'current_students',
    'is_featured',
    'access_duration',
    'access_devices',
    'certificate_info',
  ]);

  const formProps = useForm<MainTabFormValues>({
    defaultValues: initialData,
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const { data } = useCourseData();
  const { urls, options } = data;

  const isReachedFeaturedQuotaLimit = featured_quota < 1 && !course.is_featured;
  const isUdemyCourse = data.options.course_style === 'udemy';
  const isDirty = !deepEqual(formProps.formState.defaultValues, formProps.watch());
  const blockingFunction = useBlockerFunction(isDirty);
  const { isLoading, onUpdateMainSettings } = useUpdateMain(courseId, formProps.reset);

  const addons = useGetUnlockAddons(EAddon.MULTI_INSTRUCTORS);
  const {
    isAddonEnabled, isProActive
  } = useUnlockBannerState(courseId, EAddon.MULTI_INSTRUCTORS);

  return (
    <FormProvider {...formProps}>
      {isDirty && <Prompt when={blockingFunction}/>}
      <form onSubmit={formProps.handleSubmit(onUpdateMainSettings, scrollToError)}>
        <FormWrapper>
          <TabHeader text={__('Main')} />
          <TabContentBlock>
            <Text color="dark">{__('Course info')}</Text>
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
              prefix={`${data.urls.courses}/`}
            />
            <SelectCategoryField
              name="category"
              label={__('Category')}
              placeholder={__('Category')}
              categories={categories}
              isAllowedCreateCategory={!options.is_instructor || options.create_category_allowed}
              queryKey={['settings', courseId]}
            />
            <SelectField name="level" label={__('Level')} placeholder={__('Select level')} options={levels} />
            <Flex justify="space-between" alignItems="flex-end">
              <FieldWrapper>
                <UserCard name={course?.owner?.name || ''} url={course?.owner?.avatar} />
              </FieldWrapper>
              <FieldWrapper>
                <WithAddon addon={EAddon.MULTI_INSTRUCTORS}>
                  <CoInstructorField
                    // @ts-ignore
                    name="co_instructor"
                    label={__('Add a co-instructor')}
                    placeholder={__('instructor')}
                  />
                </WithAddon>
              </FieldWrapper>
            </Flex>
            {!isAddonEnabled && isProActive && (
            <WithAddon
              addon={EAddon.MULTI_INSTRUCTORS}
              fallback={
                <Warning
                  text={__('Co instructor addon is not enabled!')}
                  link={getLink(urls.addons, 'Multi-instructors')}
                  title={hasPlugin(EPlugin.LMS_PRO) ? __('Enable') : __('Enable Pro')}
                />
              }
            />
            )}
            <Box>
              <DropFileLoaderField name="image" label={__('Image')} type="image" />
            </Box>
            <Flex justify="space-between">
              <FieldWrapper>
                <TextField name="duration_info" label={__('Course duration')} placeholder={__('Enter duration info')}/>
              </FieldWrapper>
              <FieldWrapper>
                <TextField
                  name="video_duration"
                  label={__('Video duration')}
                  placeholder={__('Enter video duration')}
                />
              </FieldWrapper>
            </Flex>
            <EditorField name="content" label={__('Description')} />
            <TextareaField
              name="excerpt"
              label={__('Course preview description')}
              placeholder={__('Enter course excerpt')}
            />
            {!options.is_instructor &&
              <>
                <FieldWrapper>
                  <SelectField
                    name="status"
                    label={__('Course status')}
                    placeholder={__('Select status')}
                    options={COURSE_STATUSES}
                    isClearable
                  />
                </FieldWrapper>
                <Flex justify="space-between">
                  <FieldWrapper>
                    <DatePickerField name="status_date_start" label={__('Status start date')} />
                  </FieldWrapper>
                  <FieldWrapper>
                    <DatePickerField name="status_date_end" label={__('Status end date')} />
                  </FieldWrapper>
                </Flex>
                <Flex justify="space-between">
                  <FieldWrapper>
                    <NumberField name="current_students" label={__('Current students')} />
                  </FieldWrapper>
                  <FieldWrapper>
                    <NumberField name="views" label={__('Course Views')} />
                  </FieldWrapper>
                </Flex>
                <SwitchField
                  name="is_featured"
                  label={__('Featured course')}
                  hint={__('Enable this to add a "Featured" badge to the course ')}
                  isDisabled={isReachedFeaturedQuotaLimit}
                />
                {isReachedFeaturedQuotaLimit && (
                  <Warning text={__('You have reached your featured courses quota limit!')} onlyWarning/>
                )}
              </>
            }
          </TabContentBlock>
          <Divider variant="msVariant" />
          {isUdemyCourse &&
              <WithPlugin plugin={EPlugin.LMS_PRO}>
                  <TabContentBlock>
                      <Text color="dark">{__('Additional information')}</Text>
                      <Flex justify="space-between">
                          <FieldWrapper>
                              <TextField name="access_duration" label={__('Access duration')}
                                         placeholder={__('Enter access duration')}/>
                          </FieldWrapper>
                          <FieldWrapper>
                              <TextField name="access_devices" label={__('Access device types')}
                                         placeholder={__('Enter access device types')}/>
                          </FieldWrapper>
                      </Flex>
                      <FieldWrapper>
                          <TextField name="certificate_info" label={__('Certificate info')}
                                     placeholder={__('Enter certificate info')}/>
                      </FieldWrapper>
                  </TabContentBlock>
                  <Divider variant="msVariant"/>
              </WithPlugin>
          }
          <Footer isLoading={isLoading} sticky isDisabled={!isDirty} background="white"/>
        </FormWrapper>
        {!isAddonEnabled && (
            <UnlockAddons addons={addons} />
        )}
      </form>
    </FormProvider>
  );
});
