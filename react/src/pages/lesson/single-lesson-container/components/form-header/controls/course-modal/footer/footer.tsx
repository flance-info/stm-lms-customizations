import { FC } from 'react';
import { Button, Flex } from '@chakra-ui/react';

import { FooterProps } from './footer-interfaces';
import { useTranslate } from '~/services';

export const Footer: FC<FooterProps> = ({ onCancel, onSave, isDisabled, isLoading , isSection }) => {
  const { __ } = useTranslate();
  const label = isSection ? __('Add lesson to course') : __('Next');

  return (
    <Flex gap="20px" width="100%">
      <Button
        variant="outline"
        m="0"
        onClick={onCancel}
        w="100%"
      >
        {__('Cancel')}
      </Button>
      <Button
        variant="primary"
        m="0"
        isLoading={isLoading}
        isDisabled={isDisabled}
        onClick={onSave}
        w="100%"
      >
        {label}
      </Button>
    </Flex>
  );
};
