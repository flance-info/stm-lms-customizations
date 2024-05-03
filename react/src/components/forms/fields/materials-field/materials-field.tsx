import { FC, memo } from 'react';

import { Dropzone } from './drop-zone';
import { FieldControl } from '../../field-control';
import { MaterialsProps } from './materials-field-interfaces';

export const MaterialsField: FC<MaterialsProps> = memo((props) => {
  const { label, name, isDisabled } = props;

  return (
    <FieldControl label={label} name={name}>
      <Dropzone name={name} isDisabled={isDisabled} />
    </FieldControl>
  );
});
