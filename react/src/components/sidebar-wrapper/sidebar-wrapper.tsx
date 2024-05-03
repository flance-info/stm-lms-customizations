import React, { FC } from 'react';
import { chakra, Flex, Text } from '@chakra-ui/react';

import { SidebarWrapperProps } from './sidebar-wrapper-interfaces';

const Wrapper = chakra(Flex, {
  baseStyle: {
    flexDirection: 'column',
    position: 'fixed',
    top: '60px',
    left: '0',
    bottom: '0',
    borderRight: '1px solid',
    borderColor: 'border',
    background: 'mainBackground',
    width: '405px',
    zIndex: 50,
  },
});

const SidebarHeader = chakra(Flex, {
  baseStyle: {
    position: 'sticky',
    top: '0',
    left: '0',
    right: '0',
    justifyContent: 'space-between',
    background: 'mainBackground',
    alignItems: 'center',
    padding: '20px',
  },
});

const SidebarContent = chakra(Flex, {
  baseStyle: {
    padding: '0px 20px',
    overflowY: 'auto',
    overflowX: 'hidden',
    flexDirection: 'column',
    height: 'calc(100vh - 130px)',
  },
});

const SidebarFooter = chakra(Flex, {
  baseStyle: {
    position: 'sticky',
    left: '0',
    bottom: '0',
    right: '0',
    padding: '10px 20px',
    background: 'mainBackground',
  },
});

export const SidebarWrapper: FC<SidebarWrapperProps> = ({ children, Component, title, text, Footer }) => (
  <Wrapper>
    <SidebarHeader>
      <Flex flexDirection="column" gap="5px">
        <Text fontSize="xl" color="dark">{title}</Text>
        {text && <Text fontSize="sm" color="dark70">{text}</Text>}
      </Flex>
      {Component}
    </SidebarHeader>
    <SidebarContent>
      {children}
    </SidebarContent>
    {Footer && <SidebarFooter>{Footer}</SidebarFooter>}
  </Wrapper>
);
