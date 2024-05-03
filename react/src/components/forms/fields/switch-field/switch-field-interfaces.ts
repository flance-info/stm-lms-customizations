import { SwitchProps } from '@chakra-ui/react';

export interface SwitchFieldProps extends SwitchProps {
  name: string;
  label: string;
  hint?: string;
  header?: string;
}
