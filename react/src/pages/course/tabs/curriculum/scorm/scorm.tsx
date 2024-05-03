import { FC } from 'react';
import { AbsoluteCenter, chakra, Flex } from '@chakra-ui/react';

import { Card } from './card/card';
import { EmptyView } from '~/components/empty-view';
import { EMPTY_VIEW_TYPE } from '~/common/constants';
import { ScormProps } from './scorm-interfaces';

const ScormContainer = chakra(Flex, {
  baseStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    minWidth: '500px',
    minHeight: '400px',
    background: 'white',
    padding: '40px',
  },
});

export const Scorm: FC<ScormProps> = ({ courseId, url }) => {
  return (
    <AbsoluteCenter>
      <ScormContainer>
        <EmptyView type={EMPTY_VIEW_TYPE.SCORM}/>
        <Card courseId={courseId} url={url}/>
      </ScormContainer>
    </AbsoluteCenter>
  );
};
