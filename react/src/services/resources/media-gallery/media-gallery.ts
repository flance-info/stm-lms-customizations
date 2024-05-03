import queryString from 'query-string';

import { APIResource } from '../interfaces';
import { MediaGalleryPayload, UploadFile } from './interfaces';
import { queryFilter } from './media-gallery-utils';

export class MediaGalleryResource extends APIResource {
  getBy = (payload: MediaGalleryPayload) => {
    const { filter, ...rest } = payload;
    const stringifyFilter = queryFilter(filter);
    const queryParams = stringifyFilter + queryString.stringify(rest);
    return this._provider.get(`/media-file-manager?${queryParams}`);
  };
  upload = ({ file, config }: UploadFile) => {
    return this._provider.postFile('/media-file-manager', { file }, config);
  };
  remove = (id: number) => this._provider.remove(`/media-file-manager/${id}`);
}
