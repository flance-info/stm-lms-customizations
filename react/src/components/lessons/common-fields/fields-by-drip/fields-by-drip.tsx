import { FC } from 'react';

import { EAddon, EPlugin } from '~/common/constants';
import { FieldByLock } from './field-by-lock';
import { getCourseBuilderSettings, useHasPluginsOrAddons } from '~/common/hooks';
import { SwitchField } from '~/components/forms/fields';
import { useTranslate } from '~/services';

export const FieldsByDrip: FC = () => {
  const { hasAddon, hasPlugin } = useHasPluginsOrAddons();
  const commonData = getCourseBuilderSettings();
  const { __ } = useTranslate();
  const isExistDripAndPro = hasAddon(EAddon.SEQUENTIAL_DRIP_CONTENT) && hasPlugin(EPlugin.LMS_PRO);
  const lockBeforeStart = commonData?.data?.options.sequential_drip_content?.lock_before_start;

  return isExistDripAndPro && lockBeforeStart ? (
    <>
      <SwitchField
        name="lock_from_start"
        label={__('Unlock the lesson after a certain time after the purchase')}
      />
      <FieldByLock/>
    </>
  ) : null;
};
