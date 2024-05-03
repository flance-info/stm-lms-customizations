import { FC, memo } from 'react';
import omit from 'lodash/omit';
import { useController } from 'react-hook-form';

import { FieldControl } from '../../field-control';
import { PasswordFieldProps } from './password-field-interfaces';
import { TextInput } from './text-input';

export const PasswordField: FC<PasswordFieldProps> = memo(props => {
  const { name, label, ...otherProps } = props;
  const { field } = useController({ name });
  const fieldProps = omit(field, 'ref');

  return (
    <FieldControl label={label} name={name}>
      <TextInput
        {...otherProps}
        {...fieldProps}
      />
    </FieldControl>
  );
});
