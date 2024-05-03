import { FC } from 'react';
import { AccordionButton, Box, Flex, Text } from '@chakra-ui/react';

import { AccordionIcon } from '~/components/accordion-icon';
import { SectionTitleProps } from './section-title-interfaces';
import { useTranslate } from '~/services';

export const SectionTitle: FC<SectionTitleProps> = ({ title, isExpanded }) => {
  const { __ } = useTranslate();

  return (
    <Flex
      justify="space-between"
      padding="10px 10px 10px 25px"
      borderBottom="1px solid"
      borderColor="border"
      height="50px"
    >
      <Flex alignItems="center">
        <Box textAlign="left">
          <Text
            color={title ? 'dark' : 'dark30'}
            cursor="default"
            title={title}
          >
            {title || __('Untitled')}
          </Text>
        </Box>
      </Flex>
      <Flex alignItems="center">
        <Box>
          <AccordionButton>
            <AccordionIcon isOpen={isExpanded} />
          </AccordionButton>
        </Box>
      </Flex>
    </Flex>
  );
};
