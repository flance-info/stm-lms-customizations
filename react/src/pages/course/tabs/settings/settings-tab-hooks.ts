import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { useApi } from '~/services';

export const useSettingsApi = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const api = useApi();
  const { data: settings, isLoading } = useQuery(['settings', courseId], ({ queryKey }) => {
    const [, id] = queryKey;
    return api.settings.get(id);
  });

  return { settings, isLoading };
};
