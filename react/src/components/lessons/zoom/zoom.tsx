import { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import {
  DatePickerField,
  SelectField,
  SwitchField,
  TextField,
  TimePickerField,
} from '~/components/forms/fields';
import { getCourseBuilderSettings } from '~/common/hooks';
import { useTranslate } from '~/services';

export const Zoom: FC = () => {
  const commonData = getCourseBuilderSettings();
  const { __ } = useTranslate();

  return (
    <>
      <TextField
        name="zoom_conference_password"
        label={__('Meeting password')}
        placeholder={__('Enter password')}
      />
      <Flex justify="space-between">
        <Box minWidth="280px">
          <DatePickerField name="zoom_conference_start_date" label={__('Select start date')} />
        </Box>
        <Box minWidth="280px">
          <TimePickerField name="zoom_conference_start_time" label={__('Select start time')} />
        </Box>
      </Flex>
      <TextField name="duration" label={__('Lesson duration')} placeholder={__('Enter lesson duration')} />
      <Box w="50%">
        <SelectField
          name="zoom_conference_timezone"
          label={__('Timezone')}
          options={commonData?.data?.timezones}
          placeholder={__('Select timezone')}
          isClearable
        />
      </Box>
      <Flex>
        <Box w="55%">
          <SwitchField
            name="zoom_conference_join_before_host"
            label={__('Allow participants to join anytime')}
          />
        </Box>
        <Box w="45%">
          <SwitchField name="zoom_conference_host_video" label={__('Host video')} />
        </Box>
      </Flex>
      <Flex>
        <Box w="55%">
          <SwitchField name="zoom_conference_participants_video" label={__('Participants video')} />
        </Box>
        <Box w="45%">
          <SwitchField name="zoom_conference_mute_participants" label={__('Mute Participants upon entry')}/>
        </Box>
      </Flex>
      <SwitchField
        name="zoom_conference_enforce_login"
        label={__('Require authentication to join: Sign in to Zoom')}
        hint={__('Only users who are signed in to a Zoom account will join the meeting.')}
      />
    </>
  );
};
