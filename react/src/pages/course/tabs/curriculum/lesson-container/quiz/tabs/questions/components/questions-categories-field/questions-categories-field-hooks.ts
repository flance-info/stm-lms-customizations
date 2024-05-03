import { useApi } from '~/services';
import { useQuery } from 'react-query';
import { useInvalidate } from '~/common/hooks';

export const getCategories = () => {
  const api = useApi();
  const queryKey = ['questions', 'categories'];

  return {
    queryKey,
    query: useQuery(queryKey, api.quiz.questions.categories, { staleTime: Infinity }),
    invalidate: useInvalidate(queryKey),
  };
};
