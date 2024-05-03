import { InputProps } from '@chakra-ui/react';

import { CommonFieldProps } from '../../common-interfaces';

export interface UrlFieldProps extends CommonFieldProps<InputProps> {
  prefix: string;
}
