import { FC, memo } from 'react';
import { Editable, EditableInput, EditablePreview, Flex, Input, useEditableControls } from '@chakra-ui/react';

import { EditableFieldProps } from '../editable-field-interfaces';

const EditableControls = () => {
  const { isEditing, getEditButtonProps } = useEditableControls();

  return !isEditing ? <span className="icon-edit" {...getEditButtonProps()} /> : null;
};

const ClickablePreview: FC<{ isPreviewClickable?: boolean}> = ({ isPreviewClickable }) => {
  const { getEditButtonProps } = useEditableControls();
  const props = isPreviewClickable ? getEditButtonProps() : {};

  return <EditablePreview mr="5px" {...props} />;
};

export const EditableLabel: FC<EditableFieldProps> = memo(({ inputProps, isPreviewClickable, ...props }) => {
  return (
    <Editable textAlign="left" isPreviewFocusable={false} submitOnBlur={false} {...props}>
      <Flex alignItems="center">
        <ClickablePreview isPreviewClickable={isPreviewClickable} />
        <Input as={EditableInput} variant="msVariant" {...inputProps} />
        <EditableControls />
      </Flex>
    </Editable>
  );
});
