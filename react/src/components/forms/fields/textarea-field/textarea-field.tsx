import { FC, memo } from 'react';
import { Textarea } from '@chakra-ui/react';
import { useController } from 'react-hook-form';

import { FieldControl } from '../../field-control';
import { TextareaFieldProps } from './textarea-field-interfaces';

export const TextareaField: FC<TextareaFieldProps> = memo(({ name, label, ...otherProps }) => {
  const { field } = useController({ name });

  return (
    <FieldControl label={label} name={name}>
      <Textarea
        variant="msVariant"
        {...otherProps}
        {...field}
      />
    </FieldControl>
  );
});
