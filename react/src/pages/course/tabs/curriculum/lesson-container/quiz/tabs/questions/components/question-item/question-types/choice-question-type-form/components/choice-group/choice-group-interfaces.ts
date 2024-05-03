import { ReactNode } from 'react';

export type ChoiceGroupProps = {
  multiple: boolean;
  value: Array<string | number>;
  onChange: (value: Array<string | number>) => void;
  children: ReactNode;
};
