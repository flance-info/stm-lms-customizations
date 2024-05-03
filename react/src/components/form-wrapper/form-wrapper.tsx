import { FC, ReactNode } from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

interface FormWrapperProps extends FlexProps {
  children: ReactNode;
}

export const FormWrapper: FC<FormWrapperProps> = ({ children , ...restProps }) => (
  <Flex
    bg="white"
    p="10px 0 0"
    w="570px"
    borderRadius="4px"
    h="fit-content"
    flexDirection="column"
    {...restProps}
  >
    {children}
  </Flex>
);
