import { useParams } from 'react-router-dom';

import { EAddon, EPlugin } from '~/common/constants';
import { useCourseData, useGetSections, useHasPluginsOrAddons } from '~/common/hooks';
import { useTranslate } from '~/services';

export const useGetLinks = () => {
  const { __ } = useTranslate();
  const { hasAddon, hasPlugin } = useHasPluginsOrAddons();
  const { data } = useCourseData();
  const { courseId } = useParams<{ courseId: string }>();

  if (!courseId) return [];

  const { data: curriculum } = useGetSections(courseId);
  const scormExist = !!curriculum?.scorm?.url;
  const isInstructor = data.options.is_instructor;
  const isCoInstructor = data?.current_user_id !== Number(data?.course?.author) && isInstructor;

  const LINKS = [
    {
      path: 'curriculum',
      label: __('Curriculum'),
      visible: true,
    },
    {
      path: 'drip',
      label: __('Drip'),
      visible: scormExist
        ? false
        : !isInstructor || (hasAddon(EAddon.SEQUENTIAL_DRIP_CONTENT) && hasPlugin(EPlugin.LMS_PRO) && !isCoInstructor)
    },
    {
      path: 'settings',
      label: __('Settings'),
      visible: !isCoInstructor,
    },
    {
      path: 'pricing',
      label: __('Pricing'),
      visible: !isCoInstructor,
    },
    {
      path: 'faq',
      label: __('FAQ'),
      visible: !isCoInstructor,
    },
    {
      path: 'notice',
      label: __('Notice'),
      visible: !isCoInstructor,
    },
  ];

  return LINKS.filter(link => link.visible);
};
