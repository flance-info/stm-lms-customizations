import React, { FC } from 'react';
import { chakra, Flex, Text } from '@chakra-ui/react';

import { NavButton } from './nav-button';
import { useGetSidebarLinks } from './sidebar-hooks';
import { useTranslate } from '~/services';

const SidebarWrapper = chakra(Flex, {
  baseStyle: {
    flexDirection: 'column',
    position: 'fixed',
    top: '60px',
    left: '0',
    bottom: '0',
    borderRight: '1px solid',
    borderColor: 'border',
    background: 'mainBackground',
    width: '290px',
    padding: '20px',
    zIndex: 50,
  },
});
export const Sidebar: FC = () => {
  const { __ } = useTranslate();
  const LINKS = useGetSidebarLinks();

  return (
    <SidebarWrapper>
      <Text fontSize="xl" color="dark" mb="20px">
        {__('Settings')}
      </Text>
      {LINKS.map((link) => (
        <NavButton key={link.path} link={link} />
      ))}
    </SidebarWrapper>
  );
};
