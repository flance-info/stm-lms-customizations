import { DataProvider } from '../data-provider';
import { CourseFile } from '~/models';

export class APIResource {
  protected _provider: DataProvider;

  constructor(provider: DataProvider) {
    this._provider = provider;
  }
}

export interface MaterialsPayload {
  files: CourseFile[];
  id?: string | number;
}
