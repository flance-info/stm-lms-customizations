import { FC } from 'react';
import { Box } from '@chakra-ui/react';

import { COMMON_FIELD_WIDTH } from '~/common/constants';
import { FieldWrapperProps } from './field-wrapper-interfaces';

export const FieldWrapper: FC<FieldWrapperProps> = ({ children }) => {
  return <Box w={COMMON_FIELD_WIDTH}>{children}</Box>;
};
