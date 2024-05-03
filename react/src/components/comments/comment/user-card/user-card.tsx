import { FC } from 'react';
import { Avatar, Flex, Text } from '@chakra-ui/react';

import { UserCardProps } from './user-card-interfaces';

export const UserCard: FC<UserCardProps> = ({ name, email, src }) => {
  return (
    <Flex gap="10px" alignItems="center">
      <Avatar name={name} src={src} w="40px" h="40px"/>
      <Flex flexDirection="column" justify="center">
        <Text color="dark100" fontSize="sm" fontWeight="bold">{name}</Text>
        <Text color="dark50" fontSize="xs" fontWeight="medium">{email}</Text>
      </Flex>
    </Flex>
  );
};