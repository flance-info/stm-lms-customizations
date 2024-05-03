import { chakra, Flex } from '@chakra-ui/react';

export const MediaContainer = chakra(Flex, {
  baseStyle: {
    w: '205px',
    h: '130px',
    borderRadius: 'sm',
    cursor: 'pointer',
    transition: 'box-shadow 0.1s',
    _hover: {
      borderRadius: '4px 4px 0 0',
    },
  },
});

export const Hover = chakra(Flex, {
  baseStyle: {
    transition: 'all 0.1s linear',
    opacity: 0,
    pointerEvents: 'none',
  },
});
