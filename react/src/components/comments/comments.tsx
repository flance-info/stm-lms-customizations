import React, { FC, Fragment, useState } from 'react';
import { Button, Divider, Flex, Text, Textarea } from '@chakra-ui/react';

import { Comment } from './comment';
import { CommentWithReplies } from './comments-interfaces';
import { getFormattedComments } from './comments-utils';
import { Loader } from '~/components/loader';
import { useCreateComment, useGetComments } from './comments-hooks';
import { useTranslate } from '~/services';
import { WithComments } from './with-comments';
import { CommentsContainer, CommentsContent } from '~/components/comments/comments-styles';

export const Comments: FC = () => {
  const [value, setValue] = useState<string>('');
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value);

  const { data, isLoading } = useGetComments();
  const createComment = useCreateComment(value);
  const { __ } = useTranslate();

  if (isLoading) {
    return <Loader />;
  }

  const onCreateComment = async () => {
    await createComment?.mutateAsync();
    await setValue('');
  };

  const formattedComments = getFormattedComments(data?.comments);

  return (
    <CommentsContainer>
      <Divider variant="msVariant" />
      <CommentsContent>
        <Flex flexDirection="column" gap="10px" p="20px 0">
          <Text fontSize="md" fontWeight="bold">{__('New question')}</Text>
          <Textarea
            variant="msVariant"
            placeholder={__('Enter question')}
            value={value}
            onChange={onChange}
          />
          <Button
            variant="primary"
            m="0"
            w="80px"
            isDisabled={!value}
            onClick={onCreateComment}
          >
            {__('Submit')}
          </Button>
        </Flex>
      </CommentsContent>
      <Divider variant="msVariant" />
      <CommentsContent>
        <WithComments isExistComments={!!formattedComments.length}>
          {formattedComments.map((comment: CommentWithReplies) => {
            const replies = comment.replies;
            return (
              <Fragment key={comment.id}>
                <Comment comment={comment} />
                <WithComments isExistComments={!!replies.length}>
                  <Text color="dark" fontWeight="bold" mb="10px">{replies.length} Replies</Text>
                  <Flex flexDirection="column">
                    {replies.map(repliedComment => (
                      <Comment key={repliedComment.id} comment={repliedComment} isSubComment={true} />
                    ))}
                  </Flex>
                </WithComments>
              </Fragment>
            );
          })}
        </WithComments>
      </CommentsContent>
    </CommentsContainer>
  );
};
