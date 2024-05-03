import { APIResource } from './interfaces';

export interface AnnouncementPayload {
  id?: string;
  data: { announcement: string };
}

export class AnnouncementResource extends APIResource {
  get = (id?: string) => this._provider.get(`/courses/${id}/announcement`);
  put = ({ data, id }: AnnouncementPayload) => this._provider.put(`/courses/${id}/announcement`, data);
}
