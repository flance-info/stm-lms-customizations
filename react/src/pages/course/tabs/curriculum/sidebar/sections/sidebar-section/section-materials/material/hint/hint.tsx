import { FC } from 'react';
import { Flex, Icon, Text, Tooltip } from '@chakra-ui/react';

import { ELessonType, PostType } from '~/models';
import { useGetHintTexts } from './hint-hooks';

import { ReactComponent as LockIcon } from '~/assets/icons/lock-icon.svg';

interface HintProps {
  postType: PostType;
  lessonType?: ELessonType;
}

export const Hint: FC<HintProps> = ({ postType, lessonType }) => {
  const { title, description } = useGetHintTexts(postType, lessonType);

  return (
    <Tooltip
      label={
        <Flex flexDirection="column" gap="4px">
          <Text color="dark" fontSize="md">{title}</Text>
          <Text color="dark50">{description}</Text>
        </Flex>
      }
      placement="right"
      minWidth="348px"
      p="15px"
      color="dark"
      fontSize="md"
      bg="white"
      borderRadius="4px"
    >
      <Icon as={LockIcon} boxSize="12px"/>
    </Tooltip>
  );
};
