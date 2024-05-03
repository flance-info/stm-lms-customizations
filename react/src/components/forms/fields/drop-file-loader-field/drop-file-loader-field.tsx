import { FC, memo } from 'react';
import { useController } from 'react-hook-form';

import { DropFileLoaderFieldProps } from './drop-file-loader-field-interfaces';
import { Dropzone } from './dropzone';
import { FieldControl } from '../../field-control';

export const DropFileLoaderField: FC<DropFileLoaderFieldProps> = memo((props) => {
  const { name, label, ...otherProps } = props;
  const { field } = useController({ name });
  return (
    <FieldControl label={label} name={name}>
      <Dropzone name={name} {...otherProps} value={field.value} />
    </FieldControl>
  );
});
