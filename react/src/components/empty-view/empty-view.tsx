import { FC } from 'react';
import { Flex } from '@chakra-ui/react';

import { Content } from './content';
import { EmptyViewProps } from './empty-view-interfaces';

export const EmptyView: FC<EmptyViewProps> = props => {
  return (
    <Flex
      w="100%"
      h="100%"
      alignItems="center"
      justify="center"
    >
      <Content {...props}/>
    </Flex>
  );
};
