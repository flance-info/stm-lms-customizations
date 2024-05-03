import { useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import { InputActionMeta } from 'react-select';
import { useQuery } from 'react-query';

import { useApi } from '~/services';

export const usePrerequisiteFieldSearch = () => {
  const api = useApi();
  const [searchText, setSearchText] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  const handleSearchTextDebounced = useRef(debounce((searchText) => setSearchText(searchText), 300)).current;

  const onInputChange = (inputText: string, actionMeta: InputActionMeta) => {
    if (actionMeta.action !== 'input-blur' && actionMeta.action !== 'menu-close') {
      setInputValue(inputText);
      handleSearchTextDebounced(inputText);
    }
  };

  const { data, isLoading } = useQuery(
    ['courses', searchText],
    ({ queryKey }) => {
      const [, name] = queryKey;
      return api.wordpress.searchCourseByName(name);
    },
  );

  return { inputValue, onInputChange, isLoading, options: data };
};
