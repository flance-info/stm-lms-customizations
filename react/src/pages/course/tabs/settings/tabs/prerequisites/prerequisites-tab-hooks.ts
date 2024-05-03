import { useMutation } from 'react-query';

import { PrerequisitesPayload } from '~/services/resources/settings';
import { PrerequisitesTabFormValues } from './prerequisites-tab-interfaces';
import { ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useErrorToastOptions, useInvalidate } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const useUpdatePrerequisites = (
  courseId: string,
  reset: (values: Partial<PrerequisitesTabFormValues>) => void
) => {
  const api = useApi();
  const { __ } = useTranslate();
  const toast = useToast();
  const invalidate = useInvalidate(['settings', courseId]);

  const { mutate, isLoading } = useMutation((payload: PrerequisitesPayload) => {
    return api.settings.updatePrerequisites(payload);
  }, {
    onSuccess: () => {
      toast({ message: __('Prerequisites successfully saved'), type: TOAST_STATUS.SUCCESS });
      invalidate();
    },
    onError: (err: ServerError) => {
      const errorToastOptions = useErrorToastOptions(err, __('Failed to save prerequisites'));
      toast(errorToastOptions);
    },
  });

  const onUpdatePrerequisites = async (values: Partial<PrerequisitesTabFormValues>) => {
    await mutate({ prerequisites: values, id: courseId });
    reset(values);
  };

  return { isLoading, onUpdatePrerequisites };
};
