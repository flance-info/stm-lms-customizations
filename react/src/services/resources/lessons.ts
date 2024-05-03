import { APIResource } from './interfaces';

export class LessonsResource extends APIResource {
  getCourseBuilderSettings = () => this._provider.get('/course-builder/settings');
}
