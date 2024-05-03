import { FC } from 'react';

import {
  SelectCategoryFieldProps
} from '~/components/forms/fields/select-category-field/select-category-field-interfaces';
import { SelectCategoryField } from '~/components/forms/fields';
import { getCategories } from './questions-categories-field-hooks';
import { getCourseBuilderSettings } from '~/common/hooks';
import { useApi } from '~/services';

export const QuestionsCategoriesField: FC<Omit<SelectCategoryFieldProps, 'categories'>> =(props) => {
  const { isAllowedCreateCategory = true, ...selectProps } = props;
  const api = useApi();
  const { query: { data, isLoading }, queryKey } = getCategories();
  const commonData = getCourseBuilderSettings();

  if (isLoading) return null;

  const isCreateAllowedByUser = data
    ? commonData.data?.options?.question_category_allowed || !commonData.data?.options?.is_instructor
    : false;

  return <SelectCategoryField
    {...selectProps}
    isAllowedCreateCategory={isAllowedCreateCategory ? isCreateAllowedByUser : false}
    categories={data.categories}
    menuPortalTarget={document.body}
    createCategoryCallback={api.quiz.questions.createCategory}
    queryKey={queryKey}
  />;
};
