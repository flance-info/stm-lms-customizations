import { FC } from 'react';
import { Box, Flex, VStack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import {
  DatePickerField,
  SelectField,
  SwitchField,
  TextareaField,
  TimePickerField
} from '~/components/forms/fields';
import { FIELD_SPACING } from '~/common/constants';
import { getCourseBuilderSettings } from '~/common/hooks';
import { LessonTabs } from '~/components/lesson-tabs';
import { useTranslate } from '~/services';

export const Content: FC = () => {
  const { __ } = useTranslate();
  const { watch } = useFormContext();
  const id = watch('id', undefined);
  const TAB_LIST = [{ id: 'lesson', title: __('Google meet') }, { id: 'qa', title: __('Q&A') }];
  const commonData = getCourseBuilderSettings();
  const visibilityOptions = [
    { id: 'default', label: __('Default') },
    { id: 'public', label: __('Public') },
    { id: 'private', label: __('Private') },
  ];

  return (
    <Box p={FIELD_SPACING}>
      <LessonTabs isNew={!id} tabs={TAB_LIST}>
        <VStack spacing={FIELD_SPACING} align="left" p={`${FIELD_SPACING}px 0`} maxWidth="570px">
          <Flex justify="space-between">
            <Box minWidth="280px">
              <DatePickerField name="start_date" label={__('Start date')} />
            </Box>
            <Box minWidth="280px">
              <DatePickerField name="end_date" label={__('End date')} />
            </Box>
          </Flex>
          <Flex justify="space-between">
            <Box minWidth="280px">
              <TimePickerField name="start_time" label={__('Start time')} />
            </Box>
            <Box minWidth="280px">
              <TimePickerField name="end_time" label={__('End time')} />
            </Box>
          </Flex>
          <Flex justify="space-between">
            <Box width="280px">
              <SelectField name="timezone" options={commonData?.data?.timezones} label={__('Timezone')}/>
            </Box>
            <Box minWidth="280px">
              <SelectField name="visibility" options={visibilityOptions} label={__('Event Visibility')}/>
            </Box>
          </Flex>
          <TextareaField name="summary" label={__('Meeting summary')}/>
          <SwitchField name="attendees" label={__('Add Enrolled Students as Attendees')} />
        </VStack>
      </LessonTabs>
    </Box>
  );
};
