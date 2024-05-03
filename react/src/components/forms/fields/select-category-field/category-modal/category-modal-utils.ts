import { Category, Option } from '~/models';
import { useTranslate } from '~/services';

export const getFormattedOptions: (categories: Category[]) => Option[] = (categories) => {
  const { __ } = useTranslate();
  const PARENT_CATEGORY_OPTION = {
    id: 0,
    label: __('Parent category'),
  };
  const options = categories.map((category) => ({ id: category.id, label: category.name }));

  return [PARENT_CATEGORY_OPTION, ...options];
};
