import { FC, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import omit from 'lodash/omit';
import { useController } from 'react-hook-form';

import { EditorFieldProps } from './editor-field-interfaces';
import { EditorInput } from './editor-input';
import { FieldControl } from '../../field-control';

export const EditorField: FC<EditorFieldProps> = ({ name, label, height = '500px' }) => {
  const { field, fieldState } = useController({ name });
  const fieldProps = omit(field, ['ref', 'onBlur']);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const onBlur = () => setIsFocused(false);
  const onFocus = () => setIsFocused(true);

  return (
    <FieldControl label={label} name={name}>
      <Flex
        border="1px solid"
        borderColor={fieldState.error && !isFocused ? 'error' : 'transparent'}
      >
        <EditorInput {...fieldProps} onFocus={onFocus} onBlur={onBlur} height={height}/>
      </Flex>
    </FieldControl>
  );
};
