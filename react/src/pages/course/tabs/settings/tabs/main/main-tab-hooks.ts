import { useMutation } from 'react-query';

import { MainSettingsPayload } from '~/services/resources/settings';
import { MainTabFormValues } from './main-tab-interfaces';
import { ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useErrorToastOptions, useInvalidate } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const useUpdateMain = (courseId: string, reset: (values: Partial<MainTabFormValues>) => void) => {
  const api = useApi();
  const { __ } = useTranslate();
  const toast = useToast();
  const invalidate = useInvalidate(['settings', courseId]);

  const { mutate, isLoading } = useMutation((payload: MainSettingsPayload) => {
    return api.settings.updateMain(payload);
  }, {
    onSuccess: () => {
      toast({ message: __('Settings have been saved successfully'), type: TOAST_STATUS.SUCCESS });
      invalidate();
    },
    onError: (err: ServerError) => {
      const errorToastOptions = useErrorToastOptions(err, __('Failed to save settings'));
      toast(errorToastOptions);
    },
  });
  const onUpdateMainSettings = async (values: Partial<MainTabFormValues>) => {
    await mutate({ main: values, id: courseId });
    reset(values);
  };

  return { isLoading, onUpdateMainSettings };
};
