import { useMutation } from 'react-query';

import { AnnouncementPayload } from '~/services/resources/announcement';
import { FormValues } from './form-intefaces';
import { ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useErrorToastOptions, useInvalidate } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const useUpdateNotice = (courseId: string, reset: (values: FormValues) => void) => {
  const { __ } = useTranslate();

  const api = useApi();
  const toast = useToast();
  const invalidate = useInvalidate(['announcement', courseId]);

  const { mutate, isLoading } = useMutation((data: AnnouncementPayload) => {
    return api.announcement.put(data);
  }, {
    onSuccess: () => {
      toast({ message: __('Notice successfully saved'), type: TOAST_STATUS.SUCCESS });
      invalidate();
    },
    onError: (err: ServerError) => {
      const errorToastOptions = useErrorToastOptions(err, __('Failed to save notice'));
      toast(errorToastOptions);
    },
  });
  const onUpdateNotice = async (values: FormValues) => {
    await mutate({ data: values, id: courseId });
    reset(values);
  };

  return { isLoading, onUpdateNotice };
};
