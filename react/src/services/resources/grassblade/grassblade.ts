import { APIResource } from '../interfaces';
import { convertFields } from './utils';
import { CustomFormValues } from '~/models';

interface GrassBladeUpdatePayload {
  postId: string;
  fields: CustomFormValues;
}

export class GrassbladeResource extends APIResource {
  update = ({ postId, fields }: GrassBladeUpdatePayload) => {
    const convertedFields = convertFields(fields);
    return this._provider.put(`/course-builder/custom-fields/${postId}`, convertedFields);
  };
}
