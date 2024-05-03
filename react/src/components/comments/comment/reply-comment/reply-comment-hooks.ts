import { useMutation } from 'react-query';

import { ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useComments } from '../../comments-hooks';
import { useErrorToastOptions } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const useReplyCommentApi = () => {
  const { invalidate } = useComments();
  const { __ } = useTranslate();
  const toast = useToast();
  const api = useApi();

  return useMutation(api.comments.reply, {
    onSuccess: () => {
      toast({ message: __('The reply was successfully sent'), type: TOAST_STATUS.SUCCESS });
      invalidate();
    },
    onError: (error: ServerError) => {
      const errorToastOptions = useErrorToastOptions(error, __('Failed to send reply'));
      toast(errorToastOptions);
    },
  });
};
