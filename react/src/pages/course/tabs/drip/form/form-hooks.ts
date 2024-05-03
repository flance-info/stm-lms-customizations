import { useMutation } from 'react-query';

import { DripPutPayload } from '~/services/resources/drip/drip';
import { ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useErrorToastOptions, useInvalidate } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const useUpdateDrip = (courseId: string) => {
  const toast = useToast();
  const { __ } = useTranslate();
  const api = useApi();
  const invalidate = useInvalidate(['course', courseId, 'drip']);

  return useMutation((dripPayload: DripPutPayload) => {
    return api.drip.put(dripPayload);
  }, {
    onSuccess: () => {
      toast({ message: __('Drip successfully saved'), type: TOAST_STATUS.SUCCESS });
      invalidate();
    },
    onError: (err: ServerError) => {
      const errorToastOptions = useErrorToastOptions(err, __('Failed to save drip'));
      toast(errorToastOptions);
    },
  });
};
