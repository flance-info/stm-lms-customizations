import { FC } from 'react';
import omit from 'lodash/omit';

import { FieldControl } from '../../field-control';
import { Select } from './select';
import { SelectFieldProps } from './select-field-interfaces';
import { useController } from 'react-hook-form';

export const SelectField: FC<SelectFieldProps> = ({ label, name, ...otherProps }) => {
  const { field, fieldState } = useController({ name });
  const fieldProps = omit(field, 'ref');

  return (
    <FieldControl label={label} name={name}>
      <Select
        {...otherProps}
        {...fieldProps}
        /*@ts-ignore*/
        error={!!fieldState.error}
      />
    </FieldControl>
  );
};
