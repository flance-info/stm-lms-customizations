import { FC } from 'react';
import { chakra, Flex } from '@chakra-ui/react';

import { ContentProps } from './content-interfaces';
import { LearningContent } from './learning-content';
import { Title } from './title';

const ContentWrapper = chakra(Flex, {
  baseStyle: {
    flexDirection: 'column',
    gap: '32px',
    padding: '30px',
    background: 'white',
    marginTop: '60px',
  },
});

export const Content: FC<ContentProps> = ({ lessons }) => {
  return (
    <ContentWrapper>
      <Title/>
      <LearningContent lessons={lessons}/>
    </ContentWrapper>
  );
};