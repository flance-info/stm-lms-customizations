import { FC } from 'react';
import { Button, Flex } from '@chakra-ui/react';

import { CommentButtonsProps } from './comment-buttons-interfaces';
import { useTranslate } from '~/services';

export const CommentButtons: FC<CommentButtonsProps> = ({ onSubmit, onCancel, isLoading, isDisabledSubmit }) => {
  const { __ } = useTranslate();

  return (
    <Flex gap="10px">
      <Button
        variant="primary"
        m="0"
        onClick={onSubmit}
        isLoading={isLoading}
        isDisabled={isDisabledSubmit}
      >
        {__('Submit')}
      </Button>
      <Button
        m="0"
        onClick={onCancel}
        isDisabled={isLoading}
      >
        {__('Cancel')}
      </Button>
    </Flex>
  );
};