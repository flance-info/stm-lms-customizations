import { useMutation } from 'react-query';

import { Assignment, ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useCourse } from '../../../../../../course-page-hooks';
import { useErrorToastOptions, useInvalidateLesson } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const useUpdateAssignment = (reset: (values: Assignment) => void) => {
  const api = useApi();
  const toast = useToast();
  const { __ } = useTranslate();
  const { invalidate: invalidateCurriculum } = useCourse();
  const invalidateLesson = useInvalidateLesson('assignment');

  const { mutate, isLoading } = useMutation(api.curriculum.assignment.update, {
    onSuccess: async () => {
      await invalidateLesson();
      await invalidateCurriculum();
      toast({ message: __('Assignment successfully saved'), type: TOAST_STATUS.SUCCESS });
    },
    onError: (error: ServerError) => {
      const errorToastOptions = useErrorToastOptions(error, __('Failed to save an assignment'));
      toast(errorToastOptions);
    },
  });

  const onUpdateAssignment = async (values: Assignment) => {
    await mutate(values);
    reset(values);
  };

  return { onUpdateAssignment, isLoading };
};
