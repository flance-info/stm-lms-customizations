import { FC, memo } from 'react';

import { EAddon, EPlugin } from '~/common/constants';
import { NewSectionButton } from './sections/new-section-button/new-section-button';
import { Sections } from './sections';
import { SidebarWrapper } from '~/components/sidebar-wrapper';
import { ScormModal } from './modals';
import { useCourseData, useHasPluginsOrAddons } from '~/common/hooks';
import { useTranslate } from '~/services';
import { WithSidebarContext } from './sidebar-context';

export const Sidebar: FC = memo(() => {
  const { hasAddon, hasPlugin } = useHasPluginsOrAddons();
  const { data } = useCourseData();

  const isCoInstructor = data?.current_user_id !== Number(data?.course?.author) && data.options.is_instructor;
  const Component = hasAddon(EAddon.SCORM) && hasPlugin(EPlugin.LMS_PRO) && !isCoInstructor ? <ScormModal /> : null;
  const { __ } = useTranslate();

  return (
    <WithSidebarContext>
      <SidebarWrapper
        title={__('Curriculum')}
        Component={Component}
        Footer={<NewSectionButton/>}
      >
        <Sections />
      </SidebarWrapper>
    </WithSidebarContext>
  );
});
