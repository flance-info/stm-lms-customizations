import { FC, memo } from 'react';
import { Editable, EditableInput, EditablePreview, Flex, Input, useEditableControls } from '@chakra-ui/react';
import findIndex from 'lodash/findIndex';
import { useFormContext } from 'react-hook-form';
import { useMutation } from 'react-query';

import { FileNameProps } from './file-name-interfaces';
import { useApi } from '~/services';
import { useFileNameState } from './file-name-hooks';

export interface EditableControlsProps {
  isPreview?: boolean;
}

const EditableControls: FC<EditableControlsProps> = ({ isPreview }) => {
  const { isEditing, getEditButtonProps } = useEditableControls();

  if (isPreview) {
    return <EditablePreview p="0px" wordBreak="break-word" {...getEditButtonProps()}/>;
  }

  return !isEditing ? <span className="icon-edit" style={{ cursor: 'pointer' }} {...getEditButtonProps()} /> : null;
};

export const FileName: FC<FileNameProps> = memo(({ id, name, title }) => {
  const { value, onChangeHandler } = useFileNameState(title);
  const { watch } = useFormContext();
  const files = watch(name, []);
  const api = useApi();
  const { mutate } = useMutation(api.wordpress.updateMediaTitle, {
    onSuccess: (response) => {
      const updatedFileIndex = findIndex(files, { id: response.id });
      files[updatedFileIndex]['label'] = response.title.raw;
    },
  });

  return (
    <Editable
      isPreviewFocusable={false}
      onChange={onChangeHandler}
      value={value}
      onSubmit={(nextValue) => mutate({ id, data: { title: nextValue } })}
      color="dark"
      textAlign="left"
      fontSize="14px"
      minHeight="20px"
      flex={1}
    >
      <Flex alignItems="center" gap="5px">
        <EditableControls isPreview />
        <Input
          as={EditableInput}
          size="sm"
          h="20px"
          _focus={{ borderColor: 'primary' }}
          _focusVisible={{ borderColor: 'primary', border: '1px solid', borderRadius: '4px', boxShadow: 'none' }}
          minWidth="300px"
        />
        <EditableControls />
      </Flex>
    </Editable>
  );
});
