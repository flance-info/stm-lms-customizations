import { FC, useCallback, useState } from 'react';
import { Box, chakra, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { CustomFields } from '~/components/custom-fields';
import { FIELD_SPACING } from '~/common/constants';
import { LessonTabTitle } from 'components/lesson-tabs/lesson-tab-title';
import { SearchQuestions } from './components/search-questions';
import { TAB_PANELS } from './tabs-constants';
import { TabsProps } from './tabs-interfaces';
import { useTranslate } from '~/services';

const TabsContainer = chakra(Box, {
  baseStyle: {
    p: FIELD_SPACING,
  }
});

export const TabsComponent: FC<TabsProps> = ({ fields }) => {
  const { __ } = useTranslate();
  const { watch } = useFormContext();
  const id = watch('id', undefined);

  const TAB_LIST = [
    { title: __('Questions'), id: 'lesson' },
    { title: __('Settings'), id: 'settings' },
    { title: __('Q&A'), id: 'q&a' },
  ];

  if (fields?.length) {
    TAB_LIST.push({ id: 'custom_fields', title: __('Custom fields') });
  }

  const [activeTab, setActiveTab] = useState<number>(0);
  const tabChangeHandler = useCallback(setActiveTab, [setActiveTab]);
  const [isTablet] = useMediaQuery('(min-width: 1010px) and (max-width: 1230px)');
  const [isPhone] = useMediaQuery('(min-width: 400px) and (max-width: 1010px)');

  return (
    <TabsContainer>
      <Tabs variant="quiz" isFitted onChange={tabChangeHandler} >
        <Flex w="100%" justifyContent="space-between" flexWrap="wrap">
          <TabList>
            {TAB_LIST.map((tab) => (
              <Tab key={tab.id} w={isTablet ? '120px' : isPhone ? '100px' : '187px'}>
                <LessonTabTitle tab={tab}/>
              </Tab>
            ))}
          </TabList>
          {!!id && activeTab === 0 && <SearchQuestions />}
        </Flex>
        <TabPanels mt="20px">
          {TAB_PANELS.map((panel) => (
            <TabPanel key={panel.id} sx={{ paddingTop: 0 }}>{panel.component}</TabPanel>
          ))}
          {!!fields?.length && <TabPanel><CustomFields fields={fields}/></TabPanel>}
        </TabPanels>
      </Tabs>
    </TabsContainer>
  );
};
