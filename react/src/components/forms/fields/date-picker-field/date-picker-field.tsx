import { FC, memo } from 'react';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import omit from 'lodash/omit';
import { useController } from 'react-hook-form';

import { DatePickerFieldProps } from './date-picker-field-interfaces';
import { FieldControl } from '../../field-control';

import { ReactComponent as Calendar } from '~/assets/icons/calendar.svg';

import './date-picker-field.css';

export const DatePickerField: FC<DatePickerFieldProps> = memo(({ name, label, ...otherProps }) => {
  const { field } = useController({ name });
  const fieldProps = omit(field, 'ref');

  const value = field.value ? new Date(Number(field.value)).toISOString().slice(0, 10) : '';

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = Date.parse(event.target.value);
    field.onChange(isNaN(date) ? null : Number(date));
  };

  return (
    <FieldControl label={label} name={name}>
      <InputGroup>
        <Input
          variant="msVariant"
          type="date"
          {...otherProps}
          {...fieldProps}
          p="10px 10px 10px 20px"
          onChange={onChange}
          value={value}
          className="date-picker"
        />
        <InputRightElement pointerEvents="none"><Calendar/></InputRightElement>
      </InputGroup>
    </FieldControl>
  );
});
