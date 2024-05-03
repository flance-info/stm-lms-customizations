import { FC } from 'react';
import { Flex, Text } from '@chakra-ui/react';

import { useTranslate } from '~/services';

interface WithSectionsProps {
  isExistSections: boolean;
  children: React.ReactNode;
}

export const WithSections: FC<WithSectionsProps> = ({ isExistSections, children }) => {
  const { __ } = useTranslate();

  return (
    isExistSections
      ? <>{children}</>
      : (
        <Flex p="20px" justify="center" alignItems="center" h="234px">
          <Text fontSize="md" color="dark">{__('No sections in this course')}</Text>
        </Flex>
      )
  );
};
