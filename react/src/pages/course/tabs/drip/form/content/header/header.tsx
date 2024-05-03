import { FC } from 'react';
import { Box, Button, Divider, Flex, Text } from '@chakra-ui/react';

import { useTranslate } from '~/services';

interface HeaderProps {
  isLoading: boolean;
  isDisabled?: boolean;
}

export const Header: FC<HeaderProps> = ({ isLoading, isDisabled }) => {
  const { __ } = useTranslate();
  return (
    <Box mb="20px">
      <Flex justify="space-between" p="15px 20px" alignItems="center">
        <Text fontSize="xl" color="dark">
          {__('Drip content')}
        </Text>
        <Button variant="primary" type="submit" m="0" isLoading={isLoading} isDisabled={isDisabled}>
          {__('Save')}
        </Button>
      </Flex>
      <Divider variant="msVariant" />
    </Box>
  );
};