import { ReactElement, ReactNode } from 'react';

import { EAddon } from '~/common/constants';

export interface WithAddonProps {
  addon: EAddon;
  children?: ReactNode;
  fallback?: ReactElement;
}
