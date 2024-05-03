import { FC } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';

import { EditMediaFormValues, EditMediaProps } from './edit-media-interfaces';
import { MediaContainer } from '../media-item-styles';
import { TextareaField } from '~/components/forms/fields';
import { useEditFile } from './edit-media-hooks';
import { useTranslate } from '~/services';

export const EditMedia: FC<EditMediaProps> = ({ id, title, onCancel }) => {
  const formProps = useForm<EditMediaFormValues>({
    defaultValues: { title },
  });

  const { __ } = useTranslate();

  const { mutate, isLoading } = useEditFile(onCancel);

  const onSave = () => {
    mutate({ id, data: { title: formProps.watch('title') } });
  };

  return (
    <FormProvider {...formProps}>
      <MediaContainer
        p="15px"
        bg="mainBackground"
        h="fit-content"
        zIndex={5}
        boxShadow="0px 10px 30px rgba(0, 0, 0, 0.1)"
      >
        <Flex flexDirection="column" gap="15px">
          <TextareaField name="title"/>
          <Flex alignItems="center" justify="space-between">
            <Button
              onClick={onSave}
              variant="primary"
              m="0"
              h="28px"
              p="5px 10px"
              isLoading={isLoading}
              isDisabled={!formProps.formState.isDirty}
            >
              {__('Save')}
            </Button>
            <Button
              onClick={onCancel}
              m="0"
              h="28px"
              p="5px 10px"
            >
              {__('Cancel')}
            </Button>
          </Flex>
        </Flex>
      </MediaContainer>
    </FormProvider>

  );
};
