import queryString from 'query-string';

import { APIResource } from './interfaces';
import omitBy from 'lodash/omitBy';

interface MediaTitlePayload {
  id: number;
  data: {
    title: string;
  };
}

export class WordpressResource extends APIResource {
  searchCourseByName = (name: string) => {
    const searchParams = queryString.stringify({ search: name, type: 'stm-courses' });
    return this._provider.get(`/search?${searchParams}`);
  };
  getRecentCourses = () => {
    const searchParams = queryString.stringify({ type: 'stm-courses', per_page: 5 });
    return this._provider.get(`/search?${searchParams}`);
  };
  searchCoInstructorByTerm = (searchTerm: string | number | null) => {
    const searchParams = queryString.stringify({ search: searchTerm, roles: 'stm_lms_instructor' });
    return this._provider.get(`/users?${searchParams}`);
  };

  updateMediaTitle = ({ id, data }: MediaTitlePayload) => this._provider.post(`/media/${id}`, data);

  searchQuestions = (type: string, category: string, search: string) => {
    const searchParams = queryString.stringify(omitBy({ type, search, category }, (value) => !value));
    return this._provider.get(`/search?${searchParams}`);
  };
}
