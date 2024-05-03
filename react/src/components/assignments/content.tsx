import React, { FC } from 'react';
import { Box, Divider, VStack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { EditorField, NumberField } from '~/components/forms/fields';
import { FIELD_SPACING } from '~/common/constants';
import { LessonTabs } from '~/components/lesson-tabs';
import { useTranslate } from '~/services';

export const Content: FC = () => {
  const { __ } = useTranslate();
  const { watch } = useFormContext();
  const id = watch('id', undefined);
  const TAB_LIST = [{ id: 'lesson', title: __('Assignment') }, { id: 'qa', title: __('Q&A') }];

  return (
    <Box p={FIELD_SPACING}>
      <LessonTabs isNew={!id} tabs={TAB_LIST} lessonType='assignment'>
       <VStack spacing={FIELD_SPACING} align="left" p={`${FIELD_SPACING}px 0`} maxWidth="570px">
          <NumberField
            name="attempts"
            label={__('Assignment attempts')}
            placeholder={__('Enter assignment attempts')}
            withButtons
          />
          <NumberField name='assignment_passing_grade'
                       label={__('Passing grade (%)')}
                       placeholder={__('Enter Passing grade')}
                       withButtons />
        </VStack>

        <Divider variant="msVariant" m="20px 0"/>
        <EditorField name="content" label={__('Assignment content')}/>
      </LessonTabs>
    </Box>
  );
};
