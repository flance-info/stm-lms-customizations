import { FC, ReactNode } from 'react';
import { Box, Icon, Menu, MenuButton, MenuList, Portal, useDisclosure } from '@chakra-ui/react';
import debounce from 'lodash/debounce';
import { LineThroughButton } from './button-bar-styles';

import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ReactComponent as ArrowTriangleIcon } from 'assets/icons/arrow-triangle.svg';

interface HoverMenuProps {
  children: ReactNode;
  label: string;
}

export const HoverMenu: FC<HoverMenuProps> = ({ children, label }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onCloseDelayed = debounce(onClose, 300);
  const onOpenDelayed = () => {
    onCloseDelayed.cancel();
    onOpen();
  };

  return (
    <Box
      zIndex={19}
    >
      <Menu isOpen={isOpen}>
        <MenuButton
          as={LineThroughButton}
          size={'smallx'}
          onClick={onOpen}
          leftIcon={<Icon as={PlusIcon} boxSize={'8px'} />}
          rightIcon={<Icon as={ArrowTriangleIcon} boxSize={'8px'} />}
          variant={'primary'}
          sx={{ '.chakra-button__icon': { mr: '3px' } }}
        >
          {label}
        </MenuButton>
        <Portal>
          <MenuList
            zIndex={21}
            onClick={onClose}
            onMouseOver={onOpenDelayed}
            onMouseOut={onCloseDelayed}
          >
            {children}
          </MenuList>
        </Portal>
      </Menu>
    </Box>
  );
};
