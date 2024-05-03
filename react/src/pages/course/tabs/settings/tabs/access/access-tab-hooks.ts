import { useMutation } from 'react-query';

import { AccessPayload } from '~/services/resources/settings';
import { AccessTabFormValues } from './access-tab-interfaces';
import { getAccessDataByDependencies } from './access-tab-utils';
import { ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useErrorToastOptions, useInvalidate } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const useUpdateAccess = (courseId: string, reset: (values: Partial<AccessTabFormValues>) => void) => {
  const api = useApi();
  const { __ } = useTranslate();
  const toast = useToast();
  const invalidate = useInvalidate(['settings', courseId]);

  const { mutate, isLoading } = useMutation((payload: AccessPayload) => {
    return api.settings.updateAccess(payload);
  }, {
    onSuccess: () => {
      toast({ message: __('Access successfully saved '), type: TOAST_STATUS.SUCCESS });
      invalidate();
    },
    onError: (err: ServerError) => {
      const errorToastOptions = useErrorToastOptions(err, __('Failed to save an access'));
      toast(errorToastOptions);
    },
  });

  const onUpdateAccess = async (values: Partial<AccessTabFormValues>) => {
    await mutate({ access: getAccessDataByDependencies(values), id: courseId });
    reset(values);
  };

  return { isLoading, onUpdateAccess };
};
