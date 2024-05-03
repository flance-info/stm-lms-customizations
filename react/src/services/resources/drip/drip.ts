import { APIResource } from '../interfaces';
import { DripContent, DripItem } from '~/models';
import { getPreparedDrip, getPrepareInitialDrip } from './utils';

export interface DripResponse {
  drip_content: DripContent[];
}

export interface DripPutPayload {
  id: string;
  drip: { materials: DripItem[] }[];
}

export class DripResources extends APIResource {
  get = (id: string) => this._provider.get<DripResponse>(`/courses/${id}/settings/drip-content`)
    .then(response => getPrepareInitialDrip(response.drip_content));
  put = ({ id, drip }: DripPutPayload) => {
    const preparedData = getPreparedDrip(drip);
    return this._provider.put(`/courses/${id}/settings/drip-content`, preparedData);
  };
}
