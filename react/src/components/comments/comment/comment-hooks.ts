import { useState } from 'react';
import { useMutation } from 'react-query';

import { CommentOptions } from './comment-interfaces';
import { DEFAULT_COMMENT_OPTIONS } from './comment-constants';
import { ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useComments } from '../comments-hooks';
import { useErrorToastOptions } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const useCommentState = (content: string) => {
  const [text, setText] = useState<string>(content);
  const [commentOptions, setCommentOptions] = useState<CommentOptions>(DEFAULT_COMMENT_OPTIONS);
  const [showReply, setShowReply] = useState<boolean>(false);

  const onChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => setText(event.target.value);
  const onChangeCommentOptions = (options: CommentOptions) => setCommentOptions(options);
  const onChangeShowReply = (value: boolean) => setShowReply(value);

  return {
    text,
    onChangeText,
    commentOptions,
    onChangeCommentOptions,
    showReply,
    onChangeShowReply
  };
};

export const useCommentUpdate = () => {
  const { __ } = useTranslate();
  const toast = useToast();
  const api = useApi();
  const { invalidate } = useComments();

  return useMutation(api.comments.update, {
    onSuccess: () => {
      toast({ message: __('The comment was edited successfully'), type: TOAST_STATUS.SUCCESS });
      invalidate();
    },
    onError: (error: ServerError) => {
      const errorToastOptions = useErrorToastOptions(error, __('Failed to edit comment'));
      toast(errorToastOptions);
    },
  });
};
