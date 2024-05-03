import { FC } from 'react';
import { Button, Flex } from '@chakra-ui/react';

import { DeleteButton } from '~/components/delete-button';
import { PanelControlProps } from './panel-control-interfaces';
import { useGetUserInfo } from '~/common/hooks';
import { usePanelControlActions } from './panel-control-hooks';
import { useTranslate } from '~/services';

export const PanelControl: FC<PanelControlProps> = (props) => {
  const { onEdit, onReply, isSubComment, comment } = props;
  const { __ } = useTranslate();
  const { isAdmin, currentUserId } = useGetUserInfo();

  const { deleteComment } = usePanelControlActions(comment.id);

  return (
    <Flex gap="10px" alignItems="center">
      {!isSubComment && <Button m="0" onClick={onReply}>{__('Reply')}</Button>}
      {(isAdmin || currentUserId === +comment.user_id) &&
        <Button m="0" onClick={onEdit}>
          {__('Edit')}
        </Button>
      }
      <DeleteButton
        p="13px"
        borderRadius="5px"
        bg="mainBackground"
        onClick={() => deleteComment.mutate()}
      />
    </Flex>
  );
};