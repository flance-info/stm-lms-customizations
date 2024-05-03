import { FC } from 'react';
import { FormControl, FormErrorMessage, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import { useController } from 'react-hook-form';

import { RadioGroupFieldProps } from './radio-group-field-interfaces';

export const RadioGroupField: FC<RadioGroupFieldProps> = ({ name, options, ...restProps }) => {
  const { field, fieldState } = useController({ name });
  const { error } = fieldState;

  return (
    <FormControl isInvalid={!!error}>
      <RadioGroup {...restProps} {...field} variant="msVariant">
        <Stack direction="row">
          {options.map(option => (
            <Radio
              key={option.id}
              value={String(option.id)}
            >
              <Text fontSize="xs" fontWeight="semiBold" m={0}>
                {option.label}
              </Text>
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};
