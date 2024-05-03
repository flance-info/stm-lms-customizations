import { FC } from 'react';
import { useController } from 'react-hook-form';
import omit from 'lodash/omit';

import { EditableFieldProps } from './editable-field-interfaces';
import { EditableLabel } from './editable-label';
import { FieldControl } from '~/components/forms/field-control';

export const EditableField: FC<EditableFieldProps> = ({ name, ...otherProps }) => {
  const { field } = useController({ name });
  const fieldProps = omit(field, 'ref');

  return (
    <FieldControl name={name}>
      <EditableLabel {...otherProps} {...fieldProps} />
    </FieldControl>
  );
};
