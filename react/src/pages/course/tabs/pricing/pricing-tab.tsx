import { FC, memo } from 'react';
import { Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { ErrorFallback } from '~/components/error-fallback';
import { Loader } from '~/components/loader';
import { PricingForm } from './pricing-form';
import { TabWrapper } from '~/components/tab-wrapper';
import { useApi } from '~/services';

export const PricingTab: FC = memo(() => {
  const { courseId } = useParams<{ courseId?: string }>();
  if (!courseId) return null;

  const api = useApi();
  const { data, isLoading, error } = useQuery(['pricing', courseId], ({ queryKey }) => {
    const [, id] = queryKey;
    return api.pricing.get(id);
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
        <PricingForm initialData={data.pricing} courseId={courseId} />
      </TabWrapper>
    </Flex>
  );
});
