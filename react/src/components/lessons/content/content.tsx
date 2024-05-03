import { FC, ReactNode } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { CommonFields } from '../common-fields';
import { EditorField, MaterialsField } from '~/components/forms/fields';
import { CustomField, ELessonType } from '~/models';
import { FIELD_SPACING } from '~/common/constants';
import { LessonTabs } from '~/components/lesson-tabs';
import { useTranslate } from '~/services';

interface ContentProps {
  children: ReactNode;
  fields: CustomField[];
}

export const Content: FC<ContentProps> = ({ children, fields }) => {
  const { __ } = useTranslate();
  const { watch } = useFormContext();

  const { id, type, video_type } = watch();
  const key = type === ELessonType.VIDEO ? video_type : type;
  const TAB_LIST = [{ id: 'lesson', title: __('Lesson') }, { id: 'qa', title: __('Q&A') }];

  if (fields.length) {
    TAB_LIST.push({ id: 'custom_fields', title: __('Custom fields') });
  }

  return (
    <>
      <Box p={FIELD_SPACING}>
        <LessonTabs isNew={!id} tabs={TAB_LIST} fields={fields}>
          <VStack spacing={FIELD_SPACING} align="left" p={`${FIELD_SPACING}px 0`} maxWidth="570px" mb={FIELD_SPACING}>
            {children}
            <CommonFields key={key}/>
          </VStack>
          <VStack spacing={FIELD_SPACING} align="left" p={`${FIELD_SPACING}px 0`}>
            <EditorField name="content" key={key} label={__('Lesson content')}/>
            <MaterialsField
              name="files"
              label={__('Lesson materials')}
            />
          </VStack>
        </LessonTabs>
      </Box>
    </>
  );
};
