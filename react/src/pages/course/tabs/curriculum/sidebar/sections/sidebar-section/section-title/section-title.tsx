import { FC, memo, useCallback, useState } from 'react';
import { Editable, EditableInput, EditablePreview, Flex, Icon, Input, useEditableControls } from '@chakra-ui/react';

import { EditableControlsProps, SectionTitleProps } from './section-title-interfaces';
import { SidebarActions } from '../section-materials/material/material-styles';
import { useCourse } from '../../../../../../course-page-hooks';
import { useTranslate } from '~/services';
import { useUpdateSection } from '../../sections-hooks';

import { ReactComponent as PencilIcon } from '~/assets/icons/pencil-icon.svg';

const EditableControls: FC<EditableControlsProps> = ({ isPreview, hasTitle }) => {
  const { isEditing, getEditButtonProps } = useEditableControls();

  if (isPreview) {
    return <EditablePreview p="0px" w="fit-content" color={hasTitle ? 'dark' : 'dark30' } {...getEditButtonProps()}/>;
  }

  return (
    !isEditing
      ? <Icon as={PencilIcon} {...getEditButtonProps()} cursor="pointer" fill="dark50" m="0 10px"/>
      : null
  );
};

export const SectionTitle: FC<SectionTitleProps> = memo(({ section }) => {
  const [value, setValue] = useState<string>(section.title);
  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  const { courseId } = useCourse();
  if (!courseId) return null;

  const { __ } = useTranslate();
  const updateSection = useUpdateSection(courseId);
  const updateTitleHandler = (newTitle: string) => {
    updateSection.mutate({ ...section, title: newTitle });
  };

  return (
    <Editable
      placeholder={__('Untitled')}
      startWithEditView={!value}
      onChange={onChange}
      value={value}
      onSubmit={updateTitleHandler}
      color="dark"
      textAlign="left"
      fontSize="16px"
      lineHeight="16px"
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <Flex alignItems="center">
        <EditableControls isPreview hasTitle={!!value}/>
        <Input
          as={EditableInput}
          size="sm"
          h="25px"
          _focus={{ borderColor: 'primary' }}
          _focusVisible={{ borderColor: 'primary', border: '1px solid', borderRadius: '4px', boxShadow: 'none' }}
          minWidth="250px"
        />
        <SidebarActions _groupHover={{ opacity: 1, pointerEvents: 'auto' }}>
          <EditableControls />
        </SidebarActions>
      </Flex>
    </Editable>
  );
});
