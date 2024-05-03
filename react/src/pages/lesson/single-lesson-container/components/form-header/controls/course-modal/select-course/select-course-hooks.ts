import { useState } from 'react';
import { useQuery } from 'react-query';

import { useApi } from '~/services';
import { useDebounce } from '~/common/hooks';
import { useCourseContext } from '../course-modal-context';

export const useSearchFilters = () => {
  const api = useApi();
  const { onChangeCourse } = useCourseContext();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const onChangeSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onChangeCourse();
  };

  const { data, isLoading, error } = useQuery(['courses', debouncedSearchTerm], ({ queryKey }) => {
      const [, name] = queryKey;
      return api.wordpress.searchCourseByName(name);
    },
    { enabled: !!debouncedSearchTerm },
  );

  return {
    searchTerm,
    onChangeSearchTerm,
    searchResults: data || [],
    isLoading,
    error,
  };
};