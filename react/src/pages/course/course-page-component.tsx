import { FC, memo } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './header';
import { Loader } from '~/components/loader';
import { useCourseData } from '~/common/hooks';

export const CoursePage: FC = memo(() => {
  const { isLoading } = useCourseData();

  if (isLoading) {
    return <Loader isCenter/>;
  }

  return (
    <>
      <Header/>
      <Outlet />
    </>
  );
});
