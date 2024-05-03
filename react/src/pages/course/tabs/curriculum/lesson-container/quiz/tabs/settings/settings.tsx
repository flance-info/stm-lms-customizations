import React, { FC } from 'react';
import { Box, Divider, Flex, VStack } from '@chakra-ui/react';

import { EditorField, NumberField, SelectField, SwitchField, TextareaField } from '~/components/forms/fields';
import { FieldGroup } from '~/components/forms/field-group';
import { FIELD_SPACING } from '~/common/constants';
import { useGetOptions } from './settings-i18n';
import { useTranslate } from '~/services';

export const Settings: FC = () => {
  const { duration_measure, style } = useGetOptions();
  const { __ } = useTranslate();

  return (
    <>
      <FieldGroup justifyContent={'left'} width={'fixed'}>
        <VStack spacing={FIELD_SPACING} align='left'>
          <TextareaField
            name='excerpt'
            label={__('Short description of the quiz')}
            placeholder={__('Quiz description')}
          />
          <Flex gap='10px' alignItems='center'>
            <Box w='70%'>
              <NumberField name='duration' label={__('Quiz duration')} withButtons />
            </Box>
            <Box w='30%'>
              <SelectField
                name='duration_measure'
                label={__('Time unit')}
                options={duration_measure}
                placeholder={__('Select')}
              />
            </Box>
          </Flex>
          <SelectField name='style' label={__('Quiz style')} options={style} />
          <Flex justify='space-between'>
            <SwitchField name='random_questions' label={__('Randomize questions')} />
            <SwitchField name='correct_answer' label={__('Show correct answer')} />
          </Flex>
          <Flex justify='space-between' gap='20px'>
            <NumberField name='passing_grade' label={__('Passing grade (%)')} withButtons />
            <NumberField name='re_take_cut' label={__('Points cut after retake (%)')} withButtons />
            <NumberField name='quiz_attempts'
                       label={__('Number of Attempts')}
                       withButtons />
          </Flex>
        </VStack>
      </FieldGroup>
      <Divider variant='msVariant' m='20px 0' />
      <EditorField name='content' label={__('Lesson content')} />
    </>
  );
};
