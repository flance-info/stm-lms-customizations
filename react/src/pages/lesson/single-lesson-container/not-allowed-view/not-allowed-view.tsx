import { FC } from 'react';
import { AbsoluteCenter, Flex } from '@chakra-ui/react';

import { EmptyView } from '~/components/empty-view';
import { Header } from '../../header';

interface NotAllowedViewProps {
  type: string;
}

export const NotAllowedView: FC<NotAllowedViewProps> = ({ type }) => (
  <Flex flexDirection="column" bg="mainBackground" flex={1}>
    <Header/>
    <AbsoluteCenter>
      <EmptyView type={type}/>
    </AbsoluteCenter>
  </Flex>
);
