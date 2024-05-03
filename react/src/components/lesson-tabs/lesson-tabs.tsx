import { FC } from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery } from '@chakra-ui/react';

import { Comments } from '~/components/comments';
import { CustomFields } from '~/components/custom-fields';
import { EmptyView } from '~/components/empty-view';
import { EMPTY_VIEW_TYPE } from '~/common/constants';
import { LessonTabsProps } from './lesson-tabs-interfaces';
import { LessonTabTitle } from './lesson-tab-title';

export const LessonTabs: FC<LessonTabsProps> = ({ isNew, children, tabs, fields, lessonType }) => {
  const newLessonPropsStyles = isNew ? { display: 'flex', alignItems: 'center', width: '100%' } : null;
  const [isTablet] = useMediaQuery('(min-width: 1010px) and (max-width: 1230px)');
  const [isPhone] = useMediaQuery('(min-width: 400px) and (max-width: 1010px)');
  const typeValue = lessonType === 'assignment' ? EMPTY_VIEW_TYPE.Q_A_ASSIGNMENT : EMPTY_VIEW_TYPE.Q_A;

  return (
    <Tabs variant="quiz" isFitted>
      <TabList>
        {tabs.map((tab) => (
          <Tab key={tab.id} w={isTablet ? '120px' : isPhone ? '100px' : '187px'}>
            <LessonTabTitle tab={tab}/>
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        <TabPanel>{children}</TabPanel>
        <TabPanel minHeight="50vh" {...newLessonPropsStyles}>
          {isNew
            ? <EmptyView type={typeValue}/>
            : <Comments/>
          }
        </TabPanel>
        {!!fields?.length && <TabPanel><CustomFields fields={fields}/></TabPanel>}
      </TabPanels>
    </Tabs>
  );
};
