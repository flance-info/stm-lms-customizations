import { Category } from '~/models';
import { CreateCategoryPayload } from '~/services/resources/categories';

export interface CategoryModalFormValues {
  name: string;
  parentCategory: number;
}

export interface FormProps {
  categories: Category[];
  onCategoryCreated: (category: Category) => void;
  createCategoryCallback: (category: CreateCategoryPayload) => Promise<any>;
  handleCreatedCategory: (category: string) => void;
  onClose: () => void;
  queryKey?: string | string[];
}
