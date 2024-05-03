import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

import { ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useErrorToastOptions } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const useComments = () => {
  const queryClient = useQueryClient();
  const { lessonId } = useParams<{ lessonId: string }>();
  const queryKey = ['comments', lessonId];

  return {
    lessonId,
    queryKey,
    invalidate: () => queryClient.invalidateQueries(queryKey),
  };
};

export const useGetComments = () => {
  const { lessonId } = useComments();
  const api = useApi();

  return useQuery(['comments', lessonId], ({ queryKey }) => {
    const [, id] = queryKey;
    if (!id) return;

    return api.comments.getBy(id);
  });
};

export const useCreateComment = (content: string) => {
  const api = useApi();
  const { __ } = useTranslate();
  const toast = useToast();
  const { lessonId, invalidate } = useComments();

  if (!lessonId) return;

  return useMutation(() => {
    return api.comments.create(lessonId, content);
  }, {
    onSuccess: () => {
      toast({ message: __('Comment added successfully'), type: TOAST_STATUS.SUCCESS });
      invalidate();
    },
    onError: (error: ServerError) => {
      const errorToastOptions = useErrorToastOptions(error, __('Failed to add comment'));
      toast(errorToastOptions);
    },
  });
};
