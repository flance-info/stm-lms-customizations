import { FC } from 'react';
import { useQuery } from 'react-query';

import { EditAssignmentForm } from './edit-form';
import { EditAssignmentFormContainerProps } from './interfaces';
import { ErrorFallback } from '~/components/error-fallback';
import { Loader } from '~/components/loader';
import { useApi } from '~/services';

export const EditAssignmentFormContainer: FC<EditAssignmentFormContainerProps> = ({ type, lessonId }) => {
  const api = useApi();

  const { data, isLoading, error } = useQuery(['assignment', lessonId], ({ queryKey }) => {
      const [, id] = queryKey;
      return api.curriculum.assignment.getBy(id);
    },
  );

  if (isLoading) {
    return <Loader/>;
  }

  if (!data || error) {
    return <ErrorFallback/>;
  }

  return <EditAssignmentForm key={data.assignment.id} type={type} assignment={data.assignment}/>;
};
