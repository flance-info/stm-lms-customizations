import { FC } from 'react';
import { useQuery } from 'react-query';

import { ErrorFallback } from '~/components/error-fallback';
import { Exams } from '~/models';
import { FormContainer } from './forms/form-container';
import { getCategories } from './tabs/questions/components/questions-categories-field/questions-categories-field-hooks';
import { Loader } from '~/components/loader';
import { QuizProps } from './interfaces';
import { useApi } from '~/services';

export const Quiz: FC<QuizProps> = ({ lessonId }) => {
  const api = useApi();

  const { data, isLoading } = useQuery(['quiz', lessonId], ({ queryKey }) => {
      const [, id] = queryKey;
      return api.quiz.get(id);
    }
  );

  getCategories();

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <ErrorFallback type={Exams.QUIZ}/>;
  }

  return <FormContainer key={data.quiz.id} defaultValues={data.quiz} fields={data.custom_fields} />;
};

