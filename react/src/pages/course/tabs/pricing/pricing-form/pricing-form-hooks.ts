import { useMutation } from 'react-query';

import { PricingFormValues } from './pricing-form-interfaces';
import { PricingPayload } from '~/services/resources/pricing';
import { ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useErrorToastOptions, useInvalidate } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const useUpdatePricing = (courseId: string, reset: (values: Partial<PricingFormValues>) => void) => {
  const api = useApi();
  const { __ } = useTranslate();
  const toast = useToast();
  const invalidate = useInvalidate(['pricing', courseId]);

  const { mutate, isLoading } = useMutation((payloadData: PricingPayload) => {
    return api.pricing.put(payloadData);
  }, {
    onSuccess: () => {
      toast({ message: __('Pricing has successfully been saved'), type: TOAST_STATUS.SUCCESS });
      invalidate();
    },
    onError: (err: ServerError) => {
      const errorToastOptions = useErrorToastOptions(err, __('Failed to save pricing'));
      toast(errorToastOptions);
    },
  });

  const onUpdatePricing = async (values: Partial<PricingFormValues>) => {
    await mutate({ pricing: values, id: courseId });
    reset(values);
  };

  return { isLoading, onUpdatePricing };
};
