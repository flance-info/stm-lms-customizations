import isUndefined from 'lodash/isUndefined';

import { CustomFormValues } from '~/models';

export const convertFields = (fields: CustomFormValues) => {
  for (const key in fields) {
    if (isUndefined(fields[key])) {
      fields[key] = '';
    }
  }

  return fields;
};
