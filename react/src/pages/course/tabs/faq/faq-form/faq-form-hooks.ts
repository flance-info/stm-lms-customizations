import { useMutation } from 'react-query';

import { FaqFormValues } from './faq-form-interfaces';
import { ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useErrorToastOptions, useInvalidate } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const useUpdateFaq = (courseId: string, reset: (values: FaqFormValues) => void) => {
  const api = useApi();
  const { __ } = useTranslate();
  const toast = useToast();
  const invalidate = useInvalidate(['faq', courseId]);

  const { mutate, isLoading } = useMutation(api.faq.put, {
    onSuccess: () => {
      toast({ message: __('FAQs have successfully been saved'), type: TOAST_STATUS.SUCCESS });
      invalidate();
    },
    onError: (err: ServerError) => {
      const errorToastOptions = useErrorToastOptions(err, __('Failed to save FAQs'));
      toast(errorToastOptions);
    },
  });
  const onUpdateFaq = async (values: FaqFormValues) => {
    await mutate({ faq: values.faq, id: courseId });
    reset(values);
  };

  return { isLoading, onUpdateFaq };
};
