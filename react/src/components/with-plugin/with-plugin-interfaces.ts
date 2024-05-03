import { ReactElement, ReactNode } from 'react';

import { EPlugin } from '~/common/constants';

export interface WithPluginProps {
  plugin: EPlugin;
  children?: ReactNode;
  fallback?: ReactElement;
}
