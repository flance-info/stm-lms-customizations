import { FC } from 'react';
import { IconButton, IconButtonProps } from '@chakra-ui/react';

import { ReactComponent as CloseIcon } from '~/assets/icons/close-icon.svg';

interface CloseButtonProps extends Partial<IconButtonProps> {
  onClick: () => void;
}

export const CloseButton: FC<CloseButtonProps> = ({ onClick, ...restProps }) => (
  <IconButton
    onClick={onClick}
    bg="border"
    aria-label="close"
    borderRadius="50%"
    fontSize="10px"
    color="dark50"
    w="24px"
    h="24px"
    _hover={{ background: 'dark30', color: 'dark70' }}
    icon={<CloseIcon />}
    {...restProps}
  />
);
