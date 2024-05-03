import { chakra, Flex } from '@chakra-ui/react';

export const FormWrapper = chakra(Flex, {
  baseStyle: {
    background: 'white',
    flexDirection: 'column',
    height: 'fit-content',
    paddingTop: '10px',
    borderRadius: '4px',
    width: '100%',
  },
});
