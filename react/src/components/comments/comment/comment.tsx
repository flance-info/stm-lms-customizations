import { FC, memo } from 'react';
import { Flex, Textarea } from '@chakra-ui/react';

import { CommentButtons } from './comment-buttons';
import { CommentProps } from './comment-interfaces';
import { DEFAULT_COMMENT_OPTIONS } from './comment-constants';
import { PanelControl } from './panel-control';
import { ReplyComment } from './reply-comment';
import { useCommentState, useCommentUpdate } from './comment-hooks';
import { UserCard } from './user-card';

export const Comment: FC<CommentProps> = memo(({ comment, isSubComment }) => {
  const {
    text,
    onChangeText,
    commentOptions,
    onChangeCommentOptions,
    showReply,
    onChangeShowReply,
  } = useCommentState(comment.content);

  const { mutate, isLoading } = useCommentUpdate();

  const onEdit = () => {
    mutate({ commentId: comment.id, content: text });
    onChangeCommentOptions(DEFAULT_COMMENT_OPTIONS);
  };

  return (
    <Flex
      flexDirection="column"
      p={isSubComment ? '10px 20px' : '10px 0px'}
      mb="10px"
      bg={isSubComment ? 'mainBackground' : 'transparent'}
      borderRadius="4px"
    >
      <Flex justify="space-between" alignItems="center">
        <UserCard
          name={comment.author}
          email={comment.author_email}
          src={comment.author_avatar_url}
        />
        <PanelControl
          onReply={() => onChangeShowReply(true)}
          onEdit={() => onChangeCommentOptions({ variant: 'msVariant', isReadOnly: false })}
          isSubComment={isSubComment}
          comment={comment}
        />
      </Flex>
      <Flex flexDirection="column" gap="10px" mt="20px">
        <Textarea
          variant={commentOptions.variant}
          size="xs"
          isReadOnly={commentOptions.isReadOnly}
          value={text}
          onChange={onChangeText}
        />
        {!commentOptions.isReadOnly &&
          <CommentButtons
            onSubmit={onEdit}
            onCancel={() => onChangeCommentOptions(DEFAULT_COMMENT_OPTIONS)}
            isLoading={isLoading}
          />
        }
        {showReply &&
          <ReplyComment
            onCancel={() => onChangeShowReply(false)}
            commentId={comment.id}
          />
        }
      </Flex>
    </Flex>
  );
});