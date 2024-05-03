import { useState } from 'react';
import { SingleValue } from 'react-select';
import { useQuery } from 'react-query';

import { EAddon } from '~/common/constants';
import { PostType } from '~/models';
import { SearchTypeOption } from './materials-content-interfaces';
import { useApi, useTranslate } from '~/services';
import { useDebounce, useHasPluginsOrAddons } from '~/common/hooks';

export const useGetMaterialsIds = () => {
  const [materialsIds, setMaterialsIds] = useState<number[]>([]);

  const getIsChecked = (id: number) => materialsIds.includes(id);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (event.target.checked) {
      const filteredMaterialsIds = materialsIds.filter((materialId) => materialId !== id);
      setMaterialsIds(filteredMaterialsIds);
    } else {
      setMaterialsIds((prev) => [...prev, id]);
    }
  };

  const onChangeMaterialsIds = (id: number) => {
    const isChecked = getIsChecked(id);

    if (isChecked) {
      const filteredMaterialsIds = materialsIds.filter((materialId) => materialId !== id);
      setMaterialsIds(filteredMaterialsIds);
    } else {
      setMaterialsIds((prev) => [...prev, id]);
    }
  };

  return { materialsIds, onChangeMaterialsIds, getIsChecked, handleCheckboxChange };
};

export const useSearchFilters = (courseId: string) => {
  const { __ } = useTranslate();
  const api = useApi();
  const { hasAddon } = useHasPluginsOrAddons();

  const [inputValue, setInputValue] = useState<string>('');
  const [searchType, setSearchType] = useState<SearchTypeOption | null>(null);

  const debouncedSearchTerm = useDebounce(inputValue, 500);
  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const onChangeSearchType = (newValue: SingleValue<SearchTypeOption>) => setSearchType(newValue);

  const { data, isLoading, error, isSuccess } = useQuery(
    ['import-materials', debouncedSearchTerm, searchType?.id],
    ({ queryKey }) => {
      const [, searchText, type] = queryKey;
      return api.materials.getBy({ searchTerm: searchText, type, courseId });
    },
    {
      enabled: !!debouncedSearchTerm || !!searchType,
    },
  );

  const LESSON_TYPE_OPTIONS = [
    { id: PostType.STM_ASSIGNMENTS, label: __('Assignment') },
    { id: PostType.STM_LESSONS, label: __('Lesson') },
    { id: PostType.STM_QUIZZES, label: __('Quiz') },
  ];

  if (!hasAddon(EAddon.ASSIGNMENTS)) {
    LESSON_TYPE_OPTIONS.shift();
  }

  return {
    inputValue,
    onChangeInputValue,
    setInputValue,
    searchType,
    onChangeSearchType,
    searchResults: data?.results || [],
    isLoading,
    isSuccess,
    error,
    LESSON_TYPE_OPTIONS,
  };
};
