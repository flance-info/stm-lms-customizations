import pickBy from 'lodash/pickBy';

import { APIResource } from './interfaces';
import { CourseFormValues } from 'pages/create-course/course-form/course-form-interfaces';

interface UpdateCoursePayload {
  id: string;
  status: string;
}

export class CourseResources extends APIResource {
  new = () => this._provider.get('/courses/new');
  create = (data: Partial<CourseFormValues>) => {
    const { image, ...otherValues } = data;
    const preparedData = pickBy({ ...otherValues, image_id: image?.id }, Boolean);

    return this._provider.post('/courses/create', preparedData);
  };
  getBy = (id?: string) => this._provider.get(`/courses/${id}/edit`);
  updateStatus = ({ id, status }: UpdateCoursePayload) => {
    return this._provider.put(`/courses/${id}/status`, { status });
  };
}
