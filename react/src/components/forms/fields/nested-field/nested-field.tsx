import { ChangeEvent, FC } from 'react';
import { Input, InputGroup } from '@chakra-ui/react';
import omit from 'lodash/omit';
import slugify from 'slugify';
import { useController, useFormContext } from 'react-hook-form';

import { FieldControl } from '../../field-control';
import { NestedFieldProps } from './nested-field-interfaces';

export const NestedField: FC<NestedFieldProps> = props => {
  const { name, label, nestedFieldName, ...otherProps } = props;

  const { setValue, watch } = useFormContext();
  const { field } = useController({ name });
  const fieldProps = omit(field, 'ref', 'onChange');
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (slugify(field.value, { lower: true }) === watch(nestedFieldName, '')) {
      setValue(nestedFieldName, slugify(value, { lower: true }));
    }
    field.onChange(value);
  };

  return (
    <FieldControl label={label} name={name}>
      <InputGroup>
        <Input variant="msVariant" {...otherProps} {...fieldProps} onChange={onChange} />
      </InputGroup>
    </FieldControl>
  );
};
