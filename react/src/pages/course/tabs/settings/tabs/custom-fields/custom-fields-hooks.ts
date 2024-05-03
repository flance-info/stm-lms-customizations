import { useMutation } from 'react-query';

import { CustomFormValues, NestedFormError, ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useErrorToastOptions } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const useUpdateCustomFields = (postId: string) => {
  const api = useApi();
  const { __ } = useTranslate();
  const toast = useToast();

  const { mutate, ...restProps } = useMutation(api.grassblade.update, {
    onSuccess: () => {
      toast({ message: __('Custom fields successfully saved'), type: TOAST_STATUS.SUCCESS });
    },
    onError: (err: ServerError) => {
      const errorToastOptions = useErrorToastOptions(err, __('Failed to save custom fields'));
      toast(errorToastOptions);
    },
  });

  const onUpdateCustomFields = (values: CustomFormValues) => {
    mutate({ fields: values, postId });
  };

  return { ...restProps, onUpdateCustomFields };
};

export const useCustomFieldsValidation = (validationFields: string[]) => {
  return (values: CustomFormValues) => {
    const errors: NestedFormError = {};

    validationFields.forEach(fieldName => {
      const fieldValue = values[fieldName];

      if (fieldValue == null || fieldValue === '') {
        errors[fieldName] = { message: 'This field is required' };
      }
    });

    return { values, errors };
  };
};
