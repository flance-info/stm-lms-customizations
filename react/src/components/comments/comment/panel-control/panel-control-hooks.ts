import { useMutation } from 'react-query';

import { ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useComments } from '../../comments-hooks';
import { useErrorToastOptions } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const usePanelControlActions = (commentId: string) => {
  const { __ } = useTranslate();
  const toast = useToast();
  const api = useApi();
  const { invalidate } = useComments();

  const deleteComment = useMutation(() => api.comments.remove(commentId), {
    onSuccess: () => {
      toast({ message: __('Comment was deleted successfully'), type: TOAST_STATUS.SUCCESS });
      invalidate();
    },
    onError: (error: ServerError) => {
      const errorToastOptions = useErrorToastOptions(error, __('Failed to delete comment'));
      toast(errorToastOptions);
    },
  });

  return { deleteComment };
};
