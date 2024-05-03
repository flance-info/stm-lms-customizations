import { useMutation } from 'react-query';

import { CertificatePayload } from '~/services/resources/settings';
import { CertificateTabFormValues } from './certificate-tab-intefaces';
import { ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useErrorToastOptions, useInvalidate } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const useUpdateCertificate = (courseId: string, reset: (values: Partial<CertificateTabFormValues>) => void) => {
  const api = useApi();
  const { __ } = useTranslate();
  const toast = useToast();
  const invalidate = useInvalidate(['settings', courseId]);

  const { mutate, isLoading } = useMutation((payload: CertificatePayload) => {
    return api.settings.updateCertificate(payload);
  }, {
    onSuccess: () => {
      toast({ message: __('Certificate successfully saved'), type: TOAST_STATUS.SUCCESS });
      invalidate();
    },
    onError: (err: ServerError) => {
      const errorToastOptions = useErrorToastOptions(err, __('Failed to save certificate'));
      toast(errorToastOptions);
    },
  });

  const onUpdateCertificate = async (values: Partial<CertificateTabFormValues>) => {
    await mutate({ certificate: values, id: courseId });
    reset(values);
  };

  return { isLoading, onUpdateCertificate };
};
