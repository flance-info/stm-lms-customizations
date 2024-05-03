import { EAddon, EPlugin } from '~/common/constants';
import { ELessonType, PostType } from '~/models';
import { useHasPluginsOrAddons } from '~/common/hooks';

export const useGetIsLockedByAddon = (type: PostType, lessonType?: ELessonType) => {
  const { hasAddon, hasPlugin } = useHasPluginsOrAddons();
  const isExistLmsPro = hasPlugin(EPlugin.LMS_PRO);

  let isLocked = false;

  if (type === PostType.STM_ASSIGNMENTS) {
    isLocked = !isExistLmsPro || !hasAddon(EAddon.ASSIGNMENTS);
  }

  if (type === PostType.STM_GOOGLE_MEETS) {
    isLocked = !isExistLmsPro || !hasAddon(EAddon.GOOGLE_MEET);
  }

  if (type === PostType.STM_LESSONS) {
    if (lessonType === ELessonType.STREAM) {
      isLocked = !isExistLmsPro || !hasAddon(EAddon.LIVE_STREAMS);
    }

    if (lessonType === ELessonType.ZOOM) {
      isLocked = !isExistLmsPro || !hasAddon(EAddon.ZOOM_CONFERENCE);
    }
  }

  return isLocked;
};
