import { APIResource } from './interfaces';
import { FilePayload } from '../interfaces';

export class FilesResource extends APIResource {
  post = (filePayload: FilePayload) => this._provider.postFile('/media', filePayload);
}
