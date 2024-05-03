import { FC } from 'react';
import { Flex, Text } from '@chakra-ui/react';

import { useTranslate } from '~/services';

export const Title: FC = () => {
  const { __ } = useTranslate();
  return (
    <Flex flexDirection="column" gap="5px">
      <Text fontSize="xl" color="dark" lineHeight="xxl">
        {__('Select lesson type')}
      </Text>
      <Text fontSize="sm" color="dark50">
        {__('Select material type to continue')}
      </Text>
    </Flex>
  );
};