import { RadioGroupProps } from '@chakra-ui/react';

import { Option } from '~/models';

export interface RadioGroupFieldProps extends Omit<RadioGroupProps, 'children'> {
  name: string;
  options: Option[];
}
