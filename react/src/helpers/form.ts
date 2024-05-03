import isEqual from 'lodash/isEqual';
import isNil from 'lodash/isNil';
import isObject from 'lodash/isObject';
import pick from 'lodash/pick';

import { useFormState } from 'react-hook-form';

export { WithFieldsPrefix, usePrefix } from './form/with-prefix-context';

const isError = (obj: any) =>
  obj && Object.keys(obj)
    .reduce(
      (acc, key) => !acc && (typeof obj[key] !== 'object' || key === 'ref')
      , false);
export const flattenObject = (obj: any, prefix?: string): any => Object.keys(obj).reduce((acc, key) => {
  const newPrefix = `${prefix}.${key}`;
  if (typeof obj[key] === 'object' && obj[key] !== null) {
    if (isError(obj[key])) {
      return { ...acc, [prefix ? newPrefix : key]: obj[key] };
    }
    return { ...acc, ...flattenObject(obj[key], prefix ? newPrefix : key) };
  }
}, {});

export const useFieldState = (name: string) => {
  const fieldState = useFormState();

  if (!fieldState) {
    throw new Error('useFieldState must be used within a <Form> component');
  }

  const { errors, touchedFields } = fieldState;
  const error = flattenObject(errors)[name];

  return {
    error: error ? error?.message : null,
    touched: touchedFields[name],
  };
};

export const getInitialData = <T>(data: T, items: string[]) => pick(data, items);
export const getIndexesByFieldId = <T>(fields: { id: T }[], fieldIds: T[]) =>
  fieldIds.map((id) => fields.findIndex((field) => field.id === id));

type ErrorsObject<T> = {
  [K in keyof T]: T[K] | undefined;
};

export const scrollToError = <T>(errors: ErrorsObject<T>) => {
  const firstError = Object.keys(errors)[0];
  const field = document.querySelector(`[name="${firstError}"]`)
    || document.querySelector(`[data-name="${firstError}"]`);

  if (field) {
    field.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

export const deepEqual = (a: any, b: any) => {
  if ((isNil(a) && b === '') || (a === '' && isNil(b))) {
    return true;
  }

  if (isNil(a) && isNil(b)) {
    return true;
  }

  const aIsObject = isObject(a);
  const bIsObject = isObject(b);

  if ((typeof a !== typeof b) || (aIsObject && !bIsObject) || (!aIsObject && bIsObject)) {
    return false;
  }

  if (!aIsObject && !bIsObject) {
    return isEqual(a, b);
  }

  if (aIsObject && bIsObject) {
    const keys1 = Object.keys(a);
    const keys2 = Object.keys(b);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      // @ts-ignore
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
  }

  return true;
};
