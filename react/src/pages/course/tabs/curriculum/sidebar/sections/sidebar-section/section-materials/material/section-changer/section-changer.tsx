import { FC, useMemo } from 'react';
import {
  Box,
  Button,
  Flex,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverFooter,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { ErrorFallback } from '~/components/error-fallback';
import { SectionChangerFormValues, SectionChangerProps } from './section-changer-interfaces';
import { SelectField } from '~/components/forms/fields';
import { useGetSections } from '~/common/hooks';
import { useTranslate } from '~/services';
import { useUpdateMaterials } from './section-changer-hooks';

import { ReactComponent as MoveIcon } from '~/assets/icons/move.svg';

export const SectionChanger: FC<SectionChangerProps> = ({ sectionId, material }) => {
  const formProps = useForm<SectionChangerFormValues>({
    defaultValues: { sectionId: null },
  });

  const { __ } = useTranslate();

  const { courseId } = useParams<{ courseId: string }>();
  if (!courseId) return null;

  const { data } = useGetSections(courseId);
  const updateMaterials = useUpdateMaterials(courseId);

  if (!data) return <ErrorFallback/>;

  const options = useMemo(() => {
    return data.sections.filter(section => section.id !== sectionId)
      .map(section => ({ id: section.id, label: section.title }));
  }, [data.sections]);

  const onChangeSection = () => {
    const { groupedBySections } = data;
    const sectionId = formProps.watch('sectionId');
    if (sectionId !== null) {
      const order = groupedBySections[sectionId] ? (groupedBySections[sectionId].length + 1) : 1;
      updateMaterials.mutate({
        ...material,
        section_id: sectionId,
        order,
      });
    }
  };

  return (
    <Popover placement="right" isLazy>
      <PopoverTrigger>
        <Icon as={MoveIcon} color="dark50"/>
      </PopoverTrigger>
      <Portal>
        <Box zIndex={50} w="full" h="full" position="relative">
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader p="15px 10px">{__('Move to section')}</PopoverHeader>
            <PopoverCloseButton/>
            <PopoverBody m={0} p="15px 10px">
              <FormProvider {...formProps}>
                <form>
                  <SelectField variant="option-fit" name="sectionId" options={options} placeholder={__('Select...')} />
                </form>
              </FormProvider>
            </PopoverBody>
            <PopoverFooter p="15px 10px">
              <Flex justify="flex-end">
                <Button
                  isDisabled={!formProps.formState.isDirty}
                  onClick={onChangeSection}
                  isLoading={updateMaterials.isLoading || updateMaterials.isSuccess}
                  size="sm"
                  m={0}
                >
                  {__('Move')}
                </Button>
              </Flex>
            </PopoverFooter>
          </PopoverContent>
        </Box>
      </Portal>
    </Popover>
  );
};

