import { FC } from 'react';
import { Box, Button, chakra, Flex, Icon } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';

import { CornerMenuProps } from './corner-menu-interfaces';
import { useConfirm } from '~/common/hooks';
import { useDragDropItem } from '~/components/drag-drop/DragDropItem';
import { useTranslate } from '~/services';

import { ReactComponent as DragIcon } from '~/assets/icons/drag.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ReactComponent as TrashIcon } from '~/assets/icons/trash.svg';

const MenuContainer = chakra(Box, {
  baseStyle: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    pointerEvents: 'none',
    opacity: 0,
    transition: 'all 0.25s linear',
    zIndex: 11,
  }
});

const MenuContainerItem = chakra(Flex, {
  baseStyle: {
    pointerEvents: 'auto',
  }
});

const AddMenuContainer = chakra(MenuContainerItem, {
  baseStyle: {
    position: 'absolute',
    top: '-5px',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  },
});

const AddButton = chakra(Button, {
  baseStyle: {
    w: '24px',
    h: '24px',
    boxSizing: 'content-box',
    borderRadius: '50%',
    border: '4px solid #FFFFFF',
    p: 0,
    m: 0
  },
});

const CornerMenuContainer = chakra(MenuContainerItem, {
  baseStyle: {
    alignItems: 'stretch',
    position: 'absolute',
    top: '0px',
    right: '0px',
    height: '24px',
    color: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '0 3px 0 4px',
    overflow: 'hidden',
  },
});

const MenuButton = chakra(Button, {
  baseStyle: {
    padding: '5.5px',
    fontSize: '12px',
    height: '100%',
    borderRadius: '0',
    m: '0',
    borderRight: '1px solid rgba(255, 255, 255, 0.7)',
    '&:last-of-type': {
      borderRight: 'none',
    }
  },
});

const DragMenuButton = chakra(MenuButton, {
  baseStyle: {
    bg: 'white',
    px: '16px',
    color: 'dark70',

    '&:hover': {
      bg: 'white',
      color: 'primary',
    },
  },
});

export const CornerMenu: FC<CornerMenuProps> = (props) => {
  const { onRemoveClick, onAddClick, variant = 'primary' } = props;
  const { __ } = useTranslate();
  const { id } = useDragDropItem();
  const { listeners } = useSortable({ id });
  const confirmRemove = useConfirm(onRemoveClick, __('Are you sure you want to delete this question?'));

  return (
    <MenuContainer _groupHover={{ opacity: 1 }}>
      <AddMenuContainer>
        <AddButton onClick={onAddClick} variant={'primary'}>
          <Icon as={PlusIcon} boxSize={'8px'} m={0} />
        </AddButton>
      </AddMenuContainer>
      <CornerMenuContainer bg={variant} >
        <MenuButton onClick={confirmRemove} variant={'error'}>
          <Icon as={TrashIcon} boxSize={'13px'} />
        </MenuButton>
        <DragMenuButton cursor={'grab'} {...listeners}>
          <Icon as={DragIcon} />
        </DragMenuButton>
      </CornerMenuContainer>
    </MenuContainer>
  );
};
