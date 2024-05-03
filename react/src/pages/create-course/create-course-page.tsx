import { FC, memo, useCallback } from 'react';
import { Flex } from '@chakra-ui/react';

import { CourseForm } from './course-form';
import { Fallback } from './fallback';
import { Header } from './header';
import { Loader } from '~/components/loader';
import { useNewCoursePage } from '~/common/hooks';

export const CreateCoursePage: FC = memo(() => {
  const { isLoading, data, error } = useNewCoursePage();

  const goBackHandler = useCallback(() => {
    const path = data?.is_instructor
      ? data?.user_account_url
      : data?.dashboard_courses_url;
    window.open(path, '_self');
  }, [data?.is_instructor]);

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <Fallback/>;
  }

  if (error) {
    return <Fallback message={(error as Error).message}/>;
  }

  return (
    <Flex flexDirection="column" gap="16.5px" pb="20px" bg="white" h="100vh" overflowY="auto">
      <Header onClick={goBackHandler}/>
      <CourseForm />
    </Flex>
  );
});
