import { FC, memo } from 'react';
import { Checkbox, FormControl, FormErrorMessage, Text } from '@chakra-ui/react';
import { useController } from 'react-hook-form';

import { CheckboxFieldProps } from './checkbox-field-interfaces';

export const CheckboxField: FC<CheckboxFieldProps> = memo(({ name, children, ...otherProps }) => {
  const { field, fieldState } = useController({ name });
  const { error } = fieldState;

  return (
    <FormControl isInvalid={!!error}>
      <Checkbox
        {...otherProps}
        {...field}
        defaultChecked={!!field.value}
      >
        <Text fontSize="xs" fontWeight="semiBold" m={0}>
          {children}
        </Text>
      </Checkbox>
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
});
