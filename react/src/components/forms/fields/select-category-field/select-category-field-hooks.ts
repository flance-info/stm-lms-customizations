import { useState } from 'react';

import { Category } from '~/models';
import { useController } from 'react-hook-form';

export const useSelectCategoryFieldHook = (name: string, categories: Category[] = []) => {
  const { field, fieldState } = useController({ name });
  const { value, onChange } = field;

  const [selectedOptions, setSelectedOptions] = useState<number|number[]>(value || []);
  const onChangeHandler = (newValue: Category[] | Category) => {
    const values = (newValue as Category[] || []).map((item) => item.id);
    setSelectedOptions(values);
    onChange(values);
  };

  const getValue = () => categories
    .filter((category: Category) => (selectedOptions as number[]).indexOf(category.id) !== -1);

  const onCategoryCreated = (category: Category) => {
    const values = [...value, category.id];
    setSelectedOptions(values);
    onChange(values);
  };

  return {
    categories,
    getValue,
    onChangeHandler,
    onCategoryCreated,
    error: !!fieldState.error,
  };
};
