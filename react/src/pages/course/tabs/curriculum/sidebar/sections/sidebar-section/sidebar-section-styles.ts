import { chakra, Flex } from '@chakra-ui/react';

export const SidebarSectionHeader = chakra(Flex, {
  baseStyle: {
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid',
    borderColor: 'border',
    minHeight: '50px',
  }
});