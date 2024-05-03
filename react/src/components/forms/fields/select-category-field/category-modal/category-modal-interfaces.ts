import { Category } from '~/models';
import { CreateCategoryPayload } from '~/services/resources/categories';
import { SelectFieldProps } from '../../select-field/select-field-interfaces';

export interface CategoryModalProps {
  categories: Category[];
  size?: SelectFieldProps['size'];
  onCategoryCreated: (category: Category) => void;
  createCategoryCallback: (category: CreateCategoryPayload) => Promise<any>;
  queryKey?: string | string[];
}

