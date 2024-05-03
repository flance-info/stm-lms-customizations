import { FC, memo } from 'react';
import { Flex } from '@chakra-ui/react';

import { TabWrapperProps } from './tab-wrapper-interfaces';

export const TabWrapper: FC<TabWrapperProps> = memo(({ children }) => {
  return (
    <Flex
      w="100%"
      h="calc(100vh - 60px)"
      p="30px 0 0"
      overflowY="auto"
      justify="center"
    >
      {children}
    </Flex>
  );
});
