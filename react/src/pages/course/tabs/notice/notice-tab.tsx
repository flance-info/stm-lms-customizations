import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

import { ErrorFallback } from '~/components/error-fallback';
import { Form } from './form';
import { Loader } from '~/components/loader';
import { TabWrapper } from '~/components/tab-wrapper';
import { useApi } from '~/services';
import { useQuery } from 'react-query';

export const NoticeTab: FC = () => {
  const { courseId } = useParams<{ courseId?: string }>();
  if (!courseId) return null;

  const api = useApi();
  const { data, isLoading, error } = useQuery(['announcement', courseId], ({ queryKey }) => {
    const [, id] = queryKey;
    return api.announcement.get(id);
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <ErrorFallback />;
  }

  if (error) {
    return <ErrorFallback message={(error as Error).message} />;
  }

  return (
    <Flex pt="60px" overflowX="hidden" overflowY="hidden">
      <TabWrapper>
        <Form initialData={data} courseId={courseId} />
      </TabWrapper>
    </Flex>
  );
};
