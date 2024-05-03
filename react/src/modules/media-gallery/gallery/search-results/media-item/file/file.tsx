import { FC } from 'react';
import { chakra, Flex, Icon, Text } from '@chakra-ui/react';

import { useGetIconByFileType } from './file-hooks';

interface FileProps {
  type: string;
  title: string;
}

const FileContainer = chakra(Flex, {
  baseStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: 'mainBackground',
    padding: '15px',
    width: '100%',
    borderRadius: 'inherit',
  },
});

export const File: FC<FileProps> = ({ title, type }) => {
  const FileIcon = useGetIconByFileType(type);

  return (
    <FileContainer>
      <Icon as={FileIcon} w="45px" h="40px"/>
      <Text
        overflow="hidden"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        color="dark70"
        fontWeight="medium"
        fontSize="xs"
        title={title}
      >
        {title}
      </Text>
    </FileContainer>
  );
};
