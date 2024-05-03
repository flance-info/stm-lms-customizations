import { FC, memo } from 'react';
import { Box, Divider, Text } from '@chakra-ui/react';

import { TabHeaderProps } from './tab-header-interfaces';
import { useTranslate } from '~/services';

export const TabHeader: FC<TabHeaderProps> = memo(({ text }) => {
  const { __ } = useTranslate();
  return (
    <Box>
      <Text fontSize="xl" color="dark" m="0px 0px 10px 20px">
        {__(text)}
      </Text>
      <Divider variant="msVariant" />
    </Box>
  );
});
