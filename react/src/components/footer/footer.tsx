import { FC } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';

import { FooterProps } from './footer-interfaces';
import { useTranslate } from '~/services';

export const Footer: FC<FooterProps> = (props) => {
  const { __ } = useTranslate();
  const DEFAULT_LABEL = __('Save');
  const { isLoading, label = DEFAULT_LABEL, sticky = false, isDisabled, background } = props;

  return (
    <Box
      as="footer"
      position={sticky ? 'sticky' : 'static'}
      bottom="0px"
      padding="10px 20px"
      pointerEvents={'none'}
      bg={background || 'transparent'}
      borderRadius="0 0 4px 4px"
      zIndex={19}
    >
      <Flex justify="flex-end">
        <Button
          variant="primary"
          type="submit"
          m="0"
          isLoading={isLoading}
          pointerEvents={'auto'}
          isDisabled={isDisabled}
        >
          {label}
        </Button>
      </Flex>
    </Box>
  );
};
