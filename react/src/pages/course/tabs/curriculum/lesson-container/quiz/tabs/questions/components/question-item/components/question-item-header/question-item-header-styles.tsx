import { Box, chakra, Icon, IconButton } from '@chakra-ui/react';

export const DragHandle = chakra(Box, {
  baseStyle: {
    p: '5px',
    color: 'dark20',
    cursor: 'grab',
    transition: 'all 0.25s linear',
    mr: '10px',
    '&:hover': {
      color: 'dark50',
    },
  },
  shouldForwardProp() {
    return true;
  },
});

export const ActionButton = chakra(IconButton, {
  baseStyle: {
    color: 'dark50',
    transition: 'all 0.25s linear',
    px: '8px',
    '&:hover': {
      color: 'dark70',
    },
  },
  sizes: {
    sm: {
      px: '1px',
    },
  },
});

export const ActionIcon = chakra(Icon, {
  baseStyle: {
    transition: 'all 0.25s linear',
  },
});
