import { FC } from 'react';
import { Flex, Text, Progress, IconButton } from '@chakra-ui/react';

import { ReactComponent as CloseIcon } from '~/assets/icons/close-icon.svg';

interface ProgressBarProps {
  progress: number;
  title: string;
  onCancel: () => void;
}

export const ProgressBar: FC<ProgressBarProps> = ({ progress, title, onCancel }) => {
  const text = `${title} — uploading ${progress}%`;

  return (
    <Flex alignItems="center" gap="15px" bg="mainBackground" borderRadius="sm" p="10px" w="600px">
      <Flex flexDirection="column" gap="6px" w="100%">
        <Progress
          value={progress}
          size="sm"
          borderRadius="sm"
          bg="border"
          min={0}
          max={100}
        />
        <Text fontSize="xs" fontWeight="medium" color="dark70">
          {text}
        </Text>
      </Flex>
      <IconButton
        onClick={onCancel}
        aria-label="cancel"
        w="24px"
        h="24px"
        m={0}
        borderRadius="50%"
        bg="white"
        color="dark50"
        icon={<CloseIcon/>}
      />
    </Flex>
  );
};
