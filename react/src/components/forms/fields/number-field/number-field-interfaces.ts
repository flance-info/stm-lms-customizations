import { InputProps } from '@chakra-ui/react';

import { CommonFieldProps } from '~/components/forms/common-interfaces';

export interface NumberFieldProps extends CommonFieldProps<InputProps> {
  thousandSeparator?: string;
  allowLeadingZeros?: boolean;
  allowNegative?: boolean;
  decimalSeparator?: string;
  decimalScale?: number;
  withButtons?: boolean;
  buttonsIncrement?: number;
}
