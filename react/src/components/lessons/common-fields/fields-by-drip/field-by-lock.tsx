import { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { DatePickerField, NumberField, TimePickerField } from '~/components/forms/fields';
import { useTranslate } from '~/services';

export const FieldByLock: FC = () => {
  const { __ } = useTranslate();
  const { watch } = useFormContext();
  const lockFromStart = watch('lock_from_start', false);

  return lockFromStart
    ? <NumberField name="lock_start_days" label={__('Unlock lesson after purchase (days)')} />
    : <Flex justify="space-between">
      <Box minWidth="280px">
        <DatePickerField name="start_date" label={__('Lesson start date')} />
      </Box>
      <Box minWidth="280px">
        <TimePickerField name="start_time" label={__('Lesson start time')} />
      </Box>
    </Flex>;
};
