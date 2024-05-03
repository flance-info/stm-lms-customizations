import { useMutation } from 'react-query';

import { GoogleMeet, ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useErrorToastOptions } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const useUpdateGoogleMeet = (reset: (values: GoogleMeet) => void) => {
  const api = useApi();
  const toast = useToast();
  const { __ } = useTranslate();

  const { mutate, isLoading } = useMutation(api.curriculum.googleMeet.update, {
    onSuccess: () => {
      toast({ message: __('Google meet successfully updated'), type: TOAST_STATUS.SUCCESS });
    },
    onError: (err: ServerError) => {
      const errorToastOptions = useErrorToastOptions(err, __('Failed to update Google meet'));
      toast(errorToastOptions);
    },
  });

  const onUpdateGoogleMeet = async (values: GoogleMeet) => {
    await mutate(values);
    reset(values);
  };

  return { onUpdateGoogleMeet, isLoading };
};
