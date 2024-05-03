import { FC } from 'react';

import { EPlugin } from '~/common/constants';
import { getCourseBuilderSettings, useHasPluginsOrAddons } from '~/common/hooks';
import { WithAddonProps } from './with-addon-interfaces';

export const WithAddon: FC<WithAddonProps> = ({ addon, children, fallback }) => {
  const { hasAddon, hasPlugin } = useHasPluginsOrAddons();
  const commonData = getCourseBuilderSettings();
  const is_instructor = commonData?.data?.options.is_instructor;
  const hasProAndAddon = hasAddon(addon) && hasPlugin(EPlugin.LMS_PRO);

  if (is_instructor && !(hasProAndAddon)) return null;

  return <>{hasProAndAddon ? children : fallback}</>;
};
