import { generatePath, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import { GoogleMeet, ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useErrorToastOptions } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const useCreateGoogleMeet = (reset: (values: GoogleMeet) => void) => {
  const api = useApi();
  const toast = useToast();
  const { __ } = useTranslate();

  const navigate = useNavigate();

  const navigateToEditGoogleMeet = (id: number) => {
    const path = generatePath('./:lessonId', { lessonId: id.toString() });
    navigate(path);
  };

  const createGoogleMeet = useMutation(api.curriculum.googleMeet.create, {
    onSuccess: (response: { id: number }) => {
      toast({ message: __('Google meet successfully created'), type: TOAST_STATUS.SUCCESS });
      navigateToEditGoogleMeet(response.id);
    },
    onError: (err: ServerError) => {
      const errorToastOptions = useErrorToastOptions(err, __('Failed to create Google meet'));
      toast(errorToastOptions);
    },
  });

  const onCreateGoogleMeet = (values: GoogleMeet) => {
    createGoogleMeet.mutate(values);
    reset(values);
  };

  return { onCreateGoogleMeet, isLoading: createGoogleMeet.isLoading };
};
