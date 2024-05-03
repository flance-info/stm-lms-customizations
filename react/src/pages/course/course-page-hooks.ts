import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';

export const useCourse = () => {
  const queryClient = useQueryClient();
  const { courseId } = useParams<{ courseId: string }>();
  const queryKey = ['course', courseId, 'curriculum'];

  return {
    courseId,
    queryKey,
    invalidate: () => queryClient.invalidateQueries(queryKey),
  };
};