import { FC } from 'react';
import { Flex } from '@chakra-ui/react';

interface FormWrapperProps {
  children: React.ReactNode;
}

export const FormWrapper: FC<FormWrapperProps> = ({ children }) => (
  <Flex pt="60px" overflow="hidden">
    <Flex
      justifyContent="center"
      p="40px 0 0" h="calc(100vh - 60px)"
      w="100%"
      overflowX="hidden"
      overflowY="scroll"
    >
      <Flex bg="white" borderRadius="4px" pt="10px" width="900px" h="fit-content" flexDirection="column">
        {children}
      </Flex>
    </Flex>
  </Flex>
);
