import { APIResource } from './interfaces';
import { FaqItem } from '~/models';

export interface FaqPayload {
  faq: FaqItem[];
  id?: string;
}

export class FaqResource extends APIResource {
  get = (id?: string) => this._provider.get(`/courses/${id}/settings/faq`);
  put = (faqPayload: FaqPayload) => this._provider.put(`/courses/${faqPayload.id}/settings/faq`, faqPayload.faq);
}
