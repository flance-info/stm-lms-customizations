import { useMutation } from 'react-query';

import { Assignment, ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useErrorToastOptions } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const useUpdateAssignment = (reset: (values: Assignment) => void) => {
  const api = useApi();
  const toast = useToast();
  const { __ } = useTranslate();

  const { mutate, isLoading } = useMutation(api.curriculum.assignment.update, {
    onSuccess: () => {
      toast({ message: __('Assignment successfully updated'), type: TOAST_STATUS.SUCCESS });
    },
    onError: (err: ServerError) => {
      const errorToastOptions = useErrorToastOptions(err, __('Failed to update assignment'));
      toast(errorToastOptions);
    },
  });

  const onUpdateAssignment = async (values: Assignment) => {
    await mutate(values);
    reset(values);
  };

  return { onUpdateAssignment, isLoading };
};
