import { useMutation } from 'react-query';

import { GoogleMeet, ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useCourse } from '../../../../../../course-page-hooks';
import { useErrorToastOptions, useInvalidateLesson } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const useUpdateGoogleMeet = (reset: (values: GoogleMeet) => void) => {
  const api = useApi();
  const toast = useToast();
  const { __ } = useTranslate();
  const { invalidate: invalidateCurriculum } = useCourse();
  const invalidateLesson = useInvalidateLesson('google-meet');

  const { mutate, isLoading } = useMutation(api.curriculum.googleMeet.update, {
    onSuccess: async () => {
      await invalidateLesson();
      await invalidateCurriculum();
      toast({ message: __('Google meet successfully saved'), type: TOAST_STATUS.SUCCESS });
    },
    onError: (error: ServerError) => {
      const errorToastOptions = useErrorToastOptions(error, __('Failed to save Google meet'));
      toast(errorToastOptions);
    },
  });

  const onUpdateGoogleMeet = async (values: GoogleMeet) => {
    await mutate(values);
    reset(values);
  };

  return { onUpdateGoogleMeet, isLoading };
};
