import { FC } from 'react';
import { chakra, Flex, Text } from '@chakra-ui/react';

import { Controls } from './controls';
import { GoBackButton } from '~/components/go-back-button';
import { NavLinks } from './nav-links';
import { useCourseData } from '~/common/hooks';
import { useTranslate } from '~/services';

const Title = chakra(Text, {
  baseStyle: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    paddingRight: '20px',
    maxWidth: '300px',
    minWidth: '200px',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'default',
    alignSelf: 'center',
  },
});

const Container = chakra(Flex, {
  baseStyle: {
    display: 'flex',
    background: 'headerBg',
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    zIndex: 51,
    height: '60px',
    justifyContent: 'space-between',
  },
});

export const Header: FC = () => {
  const { data } = useCourseData();
  const isInstructor = data.options.is_instructor;
  const { __ } = useTranslate();

  const goBackHandler = () => {
    const path = isInstructor ? data.urls.user_account : data.urls.dashboard_courses;
    window.open(path, '_self');
  };

  return (
    <Container as="header">
      <Flex gap="20px">
        <GoBackButton type="edit" onClick={goBackHandler} label={__('Back to courses')}/>
        <Title title={data.course?.title} >{data.course?.title ?? ''}</Title>
      </Flex>
      <NavLinks />
      <Controls />
    </Container>
  );
};
