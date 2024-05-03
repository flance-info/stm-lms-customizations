import { FC } from 'react';

import { getCourseBuilderSettings, useHasPluginsOrAddons } from '~/common/hooks';
import { WithPluginProps } from './with-plugin-interfaces';

export const WithPlugin: FC<WithPluginProps> = ({ plugin, children, fallback }) => {
  const { hasPlugin } = useHasPluginsOrAddons();
  const commonData = getCourseBuilderSettings();
  const is_instructor = commonData?.data?.options.is_instructor;

  if (is_instructor && !hasPlugin(plugin)) return null;

  return <>{hasPlugin(plugin) ? children : fallback}</>;
};
