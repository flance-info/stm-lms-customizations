import { APIResource } from './interfaces';

export interface CreateCategoryPayload {
  category: string;
  parent_category?: number;
}

export class CategoriesResource extends APIResource {
  create = (category: CreateCategoryPayload) => this._provider.post('/courses/category', category);
}
