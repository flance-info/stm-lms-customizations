import { chakra, Text } from '@chakra-ui/react';

export const MaterialTitle = chakra(Text, {
  baseStyle: {
    color: 'dark',
    fontWeight: 'medium',
    fontSize: 'sm',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    marginLeft: '10px',
    width: '185px',
  },
});
