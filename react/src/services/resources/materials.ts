import queryString from 'query-string';

import { APIResource } from './interfaces';
import { ImportMaterials } from '~/models';

interface FilterPayload {
  searchTerm?: string | number;
  type?: string | number;
  courseId: string;
}

interface ImportMaterialsResponse {
  results: ImportMaterials[];
}

interface PostImportMaterials {
  material_ids: number[];
  section_id: number;
  courseId: string;
}

export class MaterialsResource extends APIResource {
  getBy = (filterPayload: FilterPayload) => {
    const { searchTerm, type, courseId } = filterPayload;
    const searchParams = queryString.stringify({ search: searchTerm, type });
    return this._provider.get<ImportMaterialsResponse>(`/courses/${courseId}/curriculum/import?${searchParams}`);
  };
  get = (courseId: string) => this._provider.get<ImportMaterialsResponse>(`/courses/${courseId}/curriculum/import`);
  post = ({ material_ids, section_id, courseId }: PostImportMaterials) => {
    return this._provider.post(`/courses/${courseId}/curriculum/import`, { material_ids, section_id });
  };
}
