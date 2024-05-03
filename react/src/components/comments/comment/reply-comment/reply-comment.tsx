import { FC, useState } from 'react';
import { Flex, Text, Textarea } from '@chakra-ui/react';

import { CommentButtons } from '../comment-buttons';
import { ReplyCommentProps } from './reply-comment-interfaces';
import { useReplyCommentApi } from './reply-comment-hooks';
import { useTranslate } from '~/services';

export const ReplyComment: FC<ReplyCommentProps> = ({ onCancel, commentId }) => {
  const [value, setValue] = useState<string>('');
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value);

  const { __ } = useTranslate();
  const replyComment = useReplyCommentApi();
  const onReply = () => {
    replyComment.mutate({ commentId, content: value });
    onCancel();
  };

  return (
    <Flex flexDirection="column" gap="10px">
      <Text fontSize="xs" fontWeight="semiBold">{__('Reply')}</Text>
      <Textarea
        variant="msVariant"
        placeholder={__('Enter your reply')}
        size="xs"
        value={value}
        onChange={onChange}
        isDisabled={replyComment.isLoading}
      />
      <CommentButtons
        onSubmit={onReply}
        onCancel={onCancel}
        isLoading={replyComment.isLoading}
        isDisabledSubmit={!value}
      />
    </Flex>
  );
};