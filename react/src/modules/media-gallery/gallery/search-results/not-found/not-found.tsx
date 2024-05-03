import { Flex, Image, Text } from '@chakra-ui/react';

import { useTranslate } from '~/services';

import notFound from '~/assets/images/not-found.png';

export const NotFound = () => {
  const { __ } = useTranslate();

  return (
    <Flex alignItems="center" justify="center" h="410px">
      <Flex width="270px" alignItems="center" flexDirection="column" gap="20px">
        <Flex
          width="100px"
          height="100px"
          borderRadius="100%"
          background="rgba(34, 122, 255, 0.1)"
          justify="center"
          alignItems="center"
        >
          <Image src={notFound} objectFit="cover" boxSize="80px"/>
        </Flex>
        <Text color="dark" fontSize="xl" fontWeight="medium" textAlign="center">{__('Files not found')}</Text>
      </Flex>
    </Flex>
  );
};
