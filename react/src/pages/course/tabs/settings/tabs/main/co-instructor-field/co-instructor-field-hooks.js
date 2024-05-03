import { useEffect, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import { useQuery } from 'react-query';

import { useApi } from 'services';

export const useGetCoInstructorHook = (value, onChangeField) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [inputValue, setInputValue] = useState('');

  const api = useApi();

  useEffect(() => {
    if (value) {
      api.wordpress.searchCoInstructorByTerm(value.id).then((response) => {
        setSelectedOption({ id: response[0].id, name: response[0].name });
      });
    }
  }, []);

  const onChange = (option) => {
    if (!option) {
      setSelectedOption(null);
      onChangeField(null);
    } else {
      setSelectedOption(option);
      onChangeField({ id: option.id, name: option.name });
    }
  };

  const handleSearchTextDebounced = useRef(debounce((searchText) => setSearchText(searchText), 500)).current;

  const onInputChange = (inputText, actionMeta) => {
    if (actionMeta.action !== 'input-blur' && actionMeta.action !== 'menu-close') {
      setInputValue(inputText);
      handleSearchTextDebounced(inputText);
    }
  };

  const { data: options, isLoading } = useQuery(
    ['co-instructors', searchText],
    ({ queryKey }) => {
      const [, name] = queryKey;
      return api.wordpress.searchCoInstructorByTerm(name);
    },
  );

  return {
    selectedOption,
    onChange,
    inputValue,
    onInputChange,
    options,
    isLoading,
  };
};
