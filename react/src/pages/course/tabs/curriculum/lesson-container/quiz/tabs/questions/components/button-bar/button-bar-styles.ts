import { Button, chakra, Flex, IconButton } from '@chakra-ui/react';

export const ButtonBarContainer = chakra(Flex, {
  baseStyle: {
    position: 'relative',
    borderColor: 'gray50',
    borderWidth: '2px',
    borderStyle: 'dashed',
    height: '70px',
    borderRadius: '4px',
    mt: '8px',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const LineThroughButton = chakra(Button, {
  baseStyle: {
    mx: '5px',
  },
});

export const RemoveButton = chakra(IconButton, {
  baseStyle: {
    position: 'absolute',
    top: '50%',
    right: '20px',
    boxSize: '30px',
    borderRadius: '50%',
    p: '0',
    bg: 'border',
    color: 'dark50',
    m: '0',
    transform: 'translateY(-50%)',
  },
});
