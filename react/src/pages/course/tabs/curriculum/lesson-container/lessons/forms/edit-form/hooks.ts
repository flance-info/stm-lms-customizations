import { useMutation } from 'react-query';

import { Lesson, ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useCourse } from '../../../../../../course-page-hooks';
import { useErrorToastOptions, useInvalidateLesson } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const useUpdateLesson = (reset: (values: Lesson) => void) => {
  const api = useApi();
  const toast = useToast();
  const { __ } = useTranslate();
  const { invalidate: invalidateCurriculum } = useCourse();
  const invalidateLesson = useInvalidateLesson('lesson');

  const { mutate, isLoading } = useMutation(api.curriculum.lessons.update, {
    onSuccess: async () => {
      await invalidateLesson();
      await invalidateCurriculum();
      toast({ message: __('Lesson successfully saved'), type: TOAST_STATUS.SUCCESS });
    },
    onError: (error: ServerError) => {
      const errorToastOptions = useErrorToastOptions(error, __('Failed to save lesson'));
      toast(errorToastOptions);
    },
  });

  const onUpdateLesson = async (values: Lesson) => {
    await mutate(values);
    reset(values);
  };

  return { onUpdateLesson, isLoading };
};
