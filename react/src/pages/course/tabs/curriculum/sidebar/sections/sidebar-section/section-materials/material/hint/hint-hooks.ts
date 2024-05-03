import { ELessonType, PostType } from '~/models';
import { useTranslate } from '~/services';

export const useGetHintTexts = (postType: PostType, lessonType?: ELessonType) => {
  const { __ } = useTranslate();

  const texts = {
    title: '',
    description: '',
  };

  if (postType === PostType.STM_ASSIGNMENTS) {
    texts.title = __('Assignments addon disabled');
    texts.description = __('Engage and evaluate learners with interesting tasks and projects.');
  }

  if (postType === PostType.STM_GOOGLE_MEETS) {
    texts.title = __('Google meet addon disabled');
    // eslint-disable-next-line
    texts.description = __('Unlock the power of online meetings with interactive virtual classrooms. Experience smooth communication and collaboration with learners.');
  }

  if (postType === PostType.STM_LESSONS) {
    if (lessonType === ELessonType.STREAM) {
      texts.title = __('Live Stream addon disabled');
      texts.description = __('Create YouTube streams from your course to conduct lectures in real time.');
    }

    if (lessonType === ELessonType.ZOOM) {
      texts.title = __('Zoom webinar addon disabled');
      texts.description = __('Teach with Zoom lessons, meetings and webinars directly on your website.');
    }
  }

  return texts;
};
