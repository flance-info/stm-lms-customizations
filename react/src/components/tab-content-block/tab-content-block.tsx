import { FC } from 'react';
import { VStack } from '@chakra-ui/react';

import { FIELD_SPACING } from '~/common/constants';
import { TabContentBlockProps } from './tab-content-block-interfaces';

export const TabContentBlock: FC<TabContentBlockProps> = ({ children }) => (
  <VStack spacing={FIELD_SPACING} align="stretch" m={FIELD_SPACING}>
    {children}
  </VStack>
);
