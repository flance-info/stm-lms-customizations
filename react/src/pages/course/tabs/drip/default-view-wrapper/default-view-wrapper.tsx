import { FC, ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';

interface DefaultViewWrapperProps {
  children: ReactNode;
}

export const DefaultViewWrapper: FC<DefaultViewWrapperProps> = ({ children }) => (
  <Flex p="60px 0px 0px" h="calc(100vh - 60px)">
    {children}
  </Flex>
);
