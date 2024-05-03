import { FC, memo } from 'react';
import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import omit from 'lodash/omit';
import { useController } from 'react-hook-form';

import { FieldControl } from '../../field-control';
import { TextFieldProps } from './text-field-interfaces';

export const TextField: FC<TextFieldProps> = memo((props) => {
  const { name, label, prefix, ...otherProps } = props;
  const { field } = useController({ name });
  const fieldProps = omit(field, 'ref');

  return (
    <FieldControl label={label} name={name}>
      <InputGroup>
        {prefix && <InputLeftAddon>{prefix}</InputLeftAddon>}
        <Input variant="msVariant" {...otherProps} {...fieldProps} />
      </InputGroup>
    </FieldControl>
  );
});
