import { Config } from '~/services/interfaces';

export interface MediaGalleryFilter {
  search: string;
  file_type: string;
}

export interface MediaGalleryPayload {
  filter: MediaGalleryFilter;
  sort_by: string;
  per_page: number;
  offset: number;
}

export interface UploadFile {
  file: File;
  config: Config;
}
