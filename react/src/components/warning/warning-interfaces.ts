import { ReactNode } from 'react';
import { FlexProps } from '@chakra-ui/layout/dist/flex';

export interface WarningProps extends FlexProps {
  text: string;
  link?: string;
  onClick?: () => void;
  title?: string;
  children?: ReactNode;
  onlyWarning?: boolean;
}
