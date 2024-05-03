import { FC } from 'react';
import { Flex } from '@chakra-ui/react';

import { Content } from './content';
import { ELessonType } from '~/models';
import { ErrorFallback } from '~/components/error-fallback';
import { getCourseBuilderSettings } from '~/common/hooks';
import { Header } from './header';
import { Loader } from '~/components/loader';
import { useGetLessons } from './lesson-hooks';

export const LessonPage: FC = () => {
  const { isLoading, error } = getCourseBuilderSettings();
  const lessons = useGetLessons();

  if (isLoading) {
    return <Loader/>;
  }

  if (error) {
    return <ErrorFallback message={(error as Error).message} type={ELessonType.TEXT}/>;
  }

  return (
    <Flex flexDirection="column" bg="mainBackground" flex={1}>
      <Header/>
      <Flex justify="center" alignItems="center">
        <Content lessons={lessons}/>
      </Flex>
    </Flex>
  );
};
