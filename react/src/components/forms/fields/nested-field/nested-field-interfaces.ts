import { InputProps } from '@chakra-ui/react';

import { CommonFieldProps } from '../../common-interfaces';

export interface NestedFieldProps extends CommonFieldProps<InputProps> {
  nestedFieldName: string;
}

