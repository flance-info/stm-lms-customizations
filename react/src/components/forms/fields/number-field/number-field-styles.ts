import { chakra, Flex, IconButton } from '@chakra-ui/react';

export const ArrowsContainer = chakra(Flex, {
  baseStyle: {
    pos: 'absolute',
    flexDirection: 'column',
    top: '5px',
    bottom: '5px',
    right: '5px',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
});
export const ArrowButton = chakra(IconButton, {
  baseStyle: {
    bg: 'secondaryBg',
    color: 'dark50',
    m: 0,
    h: 'auto',
    px: '12px',
    py: '5px',
    borderRadius: '2px',
  },
});
