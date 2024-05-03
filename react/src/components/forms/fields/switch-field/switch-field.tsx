import { FC, memo } from 'react';
import { Flex, FormControl, FormErrorMessage, FormLabel, Switch } from '@chakra-ui/react';
import omit from 'lodash/omit';
import { useController } from 'react-hook-form';

import { Hint } from '~/components/hint';
import { SwitchFieldProps } from './switch-field-interfaces';

export const SwitchField: FC<SwitchFieldProps> = memo((props) => {
  const { name, label, hint, header, ...otherProps } = props;
  const { field, fieldState } = useController({ name });
  const fieldProps = omit(field, 'ref');
  const { error } = fieldState;

  return (
    <FormControl isInvalid={!!error}>
      <Flex alignItems="center">
        <Switch
          {...otherProps}
          {...fieldProps}
          isChecked={!!field.value}
        />
        <FormLabel mb="0" fontSize="sm">
          {label}
        </FormLabel>
        {hint && <Hint header={header} text={hint} />}
      </Flex>
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
});
