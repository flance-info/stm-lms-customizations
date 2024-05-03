  import { FC, memo } from 'react';
  import { chakra, Flex } from '@chakra-ui/react';
  import { Outlet, useParams } from 'react-router-dom';

  import { CurriculumContextProvider } from './curriculum-tab-context';
  import { Loader } from '~/components/loader';
  import { Scorm } from './scorm';
  import { Sidebar } from './sidebar';
  import { useGetSections } from '~/common/hooks';

  const Container = chakra(Flex, {
    baseStyle: {
      padding: '60px 0px 0px 405px',
      overflowY: 'hidden',
      overflowX: 'hidden',
    },
  });

  const OutletWrapper = chakra(Flex, {
    baseStyle: {
      overflowY: 'scroll',
      overflowX: 'hidden',
      padding: '30px 30px 0px 30px',
      height: 'calc(100vh - 60px)',
      width: '100%',
    },
  });

  export const CurriculumTab: FC = memo(() => {
    const { courseId } = useParams<{ courseId: string }>();
    if (!courseId) return null;

    const { data, isLoading } = useGetSections(courseId);

    if (data?.scorm?.url) {
      return <Scorm courseId={courseId} url={data?.scorm?.url}/>;
    }

    return (
      <CurriculumContextProvider>
        <Sidebar/>
        <Container>
          <OutletWrapper>
            {isLoading ? <Loader/>: <Outlet/>}
          </OutletWrapper>
        </Container>
      </CurriculumContextProvider>
    );
  });
