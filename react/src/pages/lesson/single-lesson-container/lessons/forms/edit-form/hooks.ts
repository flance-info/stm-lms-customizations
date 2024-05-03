import { useMutation } from 'react-query';

import { Lesson, ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useErrorToastOptions } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const useUpdateLesson = (reset: (values: Lesson) => void) => {
  const api = useApi();
  const toast = useToast();
  const { __ } = useTranslate();

  const { mutate, isLoading } = useMutation(api.curriculum.lessons.update, {
    onSuccess: () => {
      toast({ message: __('Lesson successfully updated'), type: TOAST_STATUS.SUCCESS });
    },
    onError: (err: ServerError) => {
      const errorToastOptions = useErrorToastOptions(err, __('Failed to update lesson'));
      toast(errorToastOptions);
    },
  });

  const onUpdateLesson = async (values: Lesson) => {
    await mutate(values);
    reset(values);
  };

  return { onUpdateLesson, isLoading };
};
