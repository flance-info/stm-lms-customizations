import { FC } from 'react';

import { EmptyView } from '~/components/empty-view';
import { EMPTY_VIEW_TYPE } from '~/common/constants';

export const DefaultView: FC = () => {
  const onClick = () => alert('Learn more');

  return (
    <EmptyView type={EMPTY_VIEW_TYPE.CURRICULUM} onClick={onClick}/>
  );
};
