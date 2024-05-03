import { FC, memo } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { UserCardProps } from './user-card-interfaces';
import { useTranslate } from '~/services';

import avatar from '~/assets/images/avatar.png';

export const UserCard: FC<UserCardProps> = memo((props) => {
  const { name, url } = props;
  const { __ } = useTranslate();
  return (
    <Flex flexDirection="row" width="100%" alignItems="center">
      <Box w="40px" h="40px" mr="10px">
        <Image objectFit="cover" h="100%" src={url || avatar} alt="owner-avatar" />
      </Box>
      <Box p="4px 0">
        <Text fontSize="xs" color="dark50" lineHeight="xs" mb="4px">
          {__('Owner')}
        </Text>
        <Text color="dark">{name}</Text>
      </Box>
    </Flex>
  );
});
