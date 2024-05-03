import { Category } from '~/models';
import { SelectFieldProps } from '../select-field/select-field-interfaces';
import { CreateCategoryPayload } from '~/services/resources/categories';

export interface SelectCategoryFieldProps extends Omit<SelectFieldProps, 'options'> {
  categories: Category[];
  isAllowedCreateCategory?: boolean;
  createCategoryCallback?: (category: CreateCategoryPayload) => Promise<any>;
  queryKey?: string | string[];
}
