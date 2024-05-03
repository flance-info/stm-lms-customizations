import { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { DatePickerField, TextField, TimePickerField } from '~/components/forms/fields';
import { useTranslate } from '~/services';

export const Stream: FC = () => {
  const { __ } = useTranslate();

  return (
    <>
      <TextField name="stream_url" label={__('Stream URL')} placeholder={__('Enter stream url')} />
      <Flex justify="space-between">
        <Box minWidth="280px">
          <DatePickerField name="stream_start_date" label={__('Select start date')} />
        </Box>
        <Box minWidth="280px">
          <DatePickerField name="stream_end_date" label={__('Select end date')} />
        </Box>
      </Flex>
      <Flex justify="space-between">
        <Box minWidth="280px">
          <TimePickerField name="stream_start_time" label={__('Select start time')} />
        </Box>
        <Box minWidth="280px">
          <TimePickerField name="stream_end_time" label={__('Select end time')} />
        </Box>
      </Flex>
      <TextField name="duration" label={__('Lesson duration')} placeholder={__('Enter lesson duration')} />
    </>
  );
};
