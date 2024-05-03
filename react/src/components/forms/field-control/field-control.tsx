import { FC, memo } from 'react';
import { FormControl, FormLabel } from '@chakra-ui/react';

import { FieldControlProps } from './field-control-interfaces';
import { FieldError } from '~/components/forms/field-error';
import { useFieldState } from '~/helpers/form';

export const FieldControl: FC<FieldControlProps> = memo((props) => {
  const { children, label, name, ...formControlProps } = props;
  const { error } = useFieldState(name);

  return (
    <FormControl isInvalid={!!error} {...formControlProps}>
      {label && (
        <FormLabel fontSize="xs" fontWeight="semiBold" mb={'3px'}>
          {label}
        </FormLabel>
      )}
      {children}
      <FieldError name={name}/>
    </FormControl>
  );
});
