import { FC } from 'react';
import { Button, ModalBody, ModalHeader, Text, VStack } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';

import { CategoryModalFormValues, FormProps } from './form-interfaces';
import { CloseModalButton } from '~/components/close-modal-button';
import { CreateCategoryPayload } from '~/services/resources/categories';
import { createCategoryValidationScheme } from '~/common/validation-schemes';
import { FIELD_SPACING, TOAST_STATUS } from '~/common/constants';
import { getFormattedOptions } from '../category-modal-utils';
import { SelectField, TextField } from '~/components/forms/fields';
import { ServerError } from '~/models';
import { useErrorToastOptions, useInvalidate } from '~/common/hooks';
import { useToast } from '~/components/toast';
import { useTranslate } from '~/services';

export const Form: FC<FormProps> = props => {
  const { categories, onCategoryCreated, createCategoryCallback, handleCreatedCategory, onClose, queryKey } = props;

  const formProps = useForm<CategoryModalFormValues>({
    defaultValues: { name: '', parentCategory: 0 },
    mode: 'onTouched',
    resolver: yupResolver(createCategoryValidationScheme),
  });

  const { __ } = useTranslate();
  const toast = useToast();
  const invalidate = useInvalidate(queryKey || '');

  const { isLoading, mutate } = useMutation(createCategoryCallback, {
    onSuccess: async (response) => {
      await invalidate();
      await onCategoryCreated(response.category);
      formProps.reset();
      toast({ message: __('Successfully created category'), type: TOAST_STATUS.SUCCESS });
      await handleCreatedCategory(response.category.name);
    },
    onError: (error: ServerError) => {
      const errorToastOptions = useErrorToastOptions(error, __('Validation error'));
      toast(errorToastOptions);
    },
  });

  const createOptionHandler = (values: CategoryModalFormValues) => {
    const option: CreateCategoryPayload = { category: values.name };

    if (values.parentCategory) {
      option.parent_category = values.parentCategory;
    }

    mutate(option);
  };

  const options = getFormattedOptions(categories);

  return (
    <FormProvider {...formProps}>
      <ModalHeader>
        <Text fontSize="xl" fontWeight="medium" color="dark100">
          {__('Add new Category')}
        </Text>
        <CloseModalButton onClick={onClose} />
      </ModalHeader>
      <ModalBody>
        <form onSubmit={e => {
          e.stopPropagation();
          return formProps.handleSubmit(createOptionHandler)(e);
        }}>
          <VStack spacing={FIELD_SPACING} align="stretch">
            <TextField name="name" label={__('Category name')} placeholder={__('Enter category name')} />
            <SelectField
              name="parentCategory"
              label={__('Select parent category (optional)')}
              options={options}
              placeholder={__('Parent category')}
            />
            <Button type="submit" variant="primary" isLoading={isLoading} width="100%" m="0px">
              {__('Add a category')}
            </Button>
          </VStack>
        </form>
      </ModalBody>
    </FormProvider>
  );
};
