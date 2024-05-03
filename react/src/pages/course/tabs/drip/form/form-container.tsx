import { FC } from 'react';
import { useQuery } from 'react-query';

import { ErrorFallback } from '~/components/error-fallback';
import { Form } from './form';
import { FormContainerProps } from './form-interfaces';
import { Loader } from '~/components/loader';
import { useApi } from '~/services';

export const FormContainer: FC<FormContainerProps> = ({ sections, materials, courseId }) => {
  const api = useApi();

  const { data, isLoading, error } = useQuery(['course', courseId, 'drip'], ({ queryKey }) => {
    const [, id] = queryKey;
    return api.drip.get(id);
  });

  if (isLoading) {
    return <Loader/>;
  }

  if (error || !data) {
    return <ErrorFallback message={(error as Error).message}/>;
  }

  return (
    <Form
      drip={data}
      sections={sections}
      materials={materials}
      courseId={courseId}
    />
  );
};
