import { FC } from 'react';
import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import { Loader } from '~/components/loader';
import { Sidebar } from './sidebar/sidebar';
import { TabWrapper } from '~/components/tab-wrapper';
import { useSettingsApi } from './settings-tab-hooks';

export const SettingsTab: FC = () => {
  const { settings, isLoading } = useSettingsApi();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Sidebar/>
      <Flex p="60px 0 0 290px" overflow="hidden">
        <TabWrapper>
          <Outlet context={settings}/>
        </TabWrapper>
      </Flex>
    </>
  );
};
