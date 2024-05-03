import { FC } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

import { DefaultViewWrapper } from '../default-view-wrapper';
import { EmptyView } from '~/components/empty-view';
import { EMPTY_VIEW_TYPE } from '~/common/constants';
import { WithDripProps } from './with-drip-interfaces';

export const WithDrip: FC<WithDripProps> = ({ isCurriculumExist, children, courseId }) => {
  const navigate = useNavigate();
  const path = generatePath('/edit-course/:courseId/curriculum', { courseId });

  return (
    isCurriculumExist
      ? <>{children}</>
      : (
        <DefaultViewWrapper>
          <EmptyView type={EMPTY_VIEW_TYPE.DRIP_EMPTY} onClick={() => navigate(path)}/>
        </DefaultViewWrapper>
      )
  );
};
