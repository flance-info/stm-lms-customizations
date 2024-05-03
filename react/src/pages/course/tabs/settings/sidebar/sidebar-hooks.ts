import { useParams } from 'react-router-dom';

import { EAddon, EPlugin } from '~/common/constants';
import { Link } from './sidebar-interfaces';
import { useCourseData, useGetSections, useHasPluginsOrAddons } from '~/common/hooks';
import { useSettingsApi } from '../settings-tab-hooks';
import { useTranslate } from '~/services';

export const useGetSidebarLinks = () => {
  const { __ } = useTranslate();
  const { hasAddon, hasPlugin } = useHasPluginsOrAddons();
  const { data } = useCourseData();
  const { settings } = useSettingsApi();

  const { courseId } = useParams<{ courseId: string }>();
  if (!courseId) return [];

  const isInstructor = data.options.is_instructor;
  const { data: curriculum } = useGetSections(courseId);

  const scormExist = !!curriculum?.scorm?.url;

  const LINKS: Link[] = [
    {
      label: __('Main'),
      icon: 'main',
      path: 'main',
      visible: true,
      isDisabled: false,
    },
    {
      label: __('Access'),
      icon: 'access',
      path: 'access',
      visible: !((!hasAddon(EAddon.SHAREWARE) || !hasPlugin(EPlugin.LMS_PRO)) && isInstructor),
      isDisabled: false,
    },
    {
      label: __('Prerequisites'),
      icon: 'prerequisites',
      path: 'prerequisites',
      visible: !((!hasAddon(EAddon.PREREQUISITE) || !hasPlugin(EPlugin.LMS_PRO)) && isInstructor),
      isDisabled: false,
    },
    {
      label: __('Course files'),
      icon: 'course-files',
      path: 'course-files',
      visible: true,
      isDisabled: false,
    },
    {
      label: __('Certificate'),
      icon: 'certificate',
      path: 'certificate',
      visible: scormExist
      ? false
      : !((!hasAddon(EAddon.CERTIFICATE_BUILDER) || !hasPlugin(EPlugin.LMS_PRO)) && isInstructor),
      isDisabled: false,
    },
    {
      label: __('Custom fields'),
      icon: 'custom-fields',
      path: 'custom-fields',
      visible: !!settings.custom_fields.length,
      isDisabled: false,
    },
  ];

  return LINKS.filter(link => link.visible);
};
