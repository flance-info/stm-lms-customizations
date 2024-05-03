import { FC } from 'react';
import { AbsoluteCenter } from '@chakra-ui/react';

import { EmptyView } from '~/components/empty-view';
import { EMPTY_VIEW_TYPE } from '~/common/constants';

export const NotFoundRoute: FC = () => (
  <AbsoluteCenter>
    <EmptyView type={EMPTY_VIEW_TYPE.NOT_FOUND_PAGE}/>
  </AbsoluteCenter>
);
