import { APIResource } from './interfaces';
import { getPreparedPricingData } from '~/helpers/data';
import { Pricing } from '~/models';

export interface PricingPayload {
  pricing: Partial<Pricing>;
  id?: string;
}

export class PricingResource extends APIResource {
  get = (id?: string) => this._provider.get(`/courses/${id}/settings/pricing`);
  put = ({ pricing, id }: PricingPayload) => {
    const data = getPreparedPricingData(pricing);
    return this._provider.put(`/courses/${id}/settings/pricing`, data);
  };
}
