import { FC } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { ControlsProps } from './controls-interfaces';
import { CourseModal } from './course-modal';
import { EAddon, EPlugin } from '~/common/constants';
import { Exams } from '~/models';
import { getCourseBuilderSettings, useHasPluginsOrAddons } from '~/common/hooks';
import { Link } from '~/components/link';
import { useTranslate } from '~/services';

export const Controls: FC<ControlsProps> = ({ isLoading, type, isNew, isDisabled }) => {
  const { __ } = useTranslate();
  const { watch } = useFormContext();
  const id = watch('id', undefined);
  const label = !id ? __('Create') : __('Save');

  const { hasAddon, hasPlugin } = useHasPluginsOrAddons();
  const commonData = getCourseBuilderSettings();
  const showShortcode = type === Exams.QUIZ && id
    && (hasAddon(EAddon.ONLINE_TESTING) && hasPlugin(EPlugin.LMS_PRO)) && !commonData.data?.options?.is_instructor;

  return (
    <Flex gap="10px" p="0 20px 0 0" alignItems="center">
      {showShortcode && <Link link={`[stm_lms_quiz_online id=${id}]`}/>}
      {!isNew && <CourseModal/>}
      <Button
        m="0"
        type="submit"
        variant="primary"
        isLoading={isLoading}
        isDisabled={isDisabled}
      >
        {label}
      </Button>
    </Flex>
  );
};
