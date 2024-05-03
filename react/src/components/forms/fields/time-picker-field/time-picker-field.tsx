import { FC, memo } from 'react';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import omit from 'lodash/omit';
import { useController } from 'react-hook-form';

import { FieldControl } from '../../field-control';
import { TimePickerFieldProps } from './time-picker-field-interfaces';

import { ReactComponent as Clock } from '~/assets/icons/clock.svg';

import './time-picker-field.css';

export const TimePickerField: FC<TimePickerFieldProps> = memo(({ name, label, ...otherProps }) => {
  const { field } = useController({ name });
  const fieldProps = omit(field, 'ref');

  return (
    <FieldControl label={label} name={name}>
      <InputGroup>
        <Input
          variant="msVariant"
          type="time"
          {...otherProps}
          {...fieldProps}
          p="10px 10px 10px 20px"
          className="time-picker"
        />
        <InputRightElement pointerEvents="none"><Clock/></InputRightElement>
      </InputGroup>
    </FieldControl>
  );
});
