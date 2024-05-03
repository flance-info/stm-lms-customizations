import { ELessonType, Exams } from '~/models';
import { useTranslate } from '~/services';

import { ReactComponent as AssignmentIcon } from '~/assets/icons/assignment-popup-icon.svg';
import { ReactComponent as GoogleMeetIcon } from '~/assets/icons/google-meet-icon.svg';
import { ReactComponent as StreamLessonIcon } from '~/assets/icons/stream-popup-icon.svg';
import { ReactComponent as TextLessonIcon } from '~/assets/icons/text-lesson-icon.svg';
import { ReactComponent as VideoLessonIcon } from '~/assets/icons/video-popup-icon.svg';
import { ReactComponent as QuizIcon } from '~/assets/icons/quiz-popup-icon.svg';
import { ReactComponent as ZoomLessonIcon } from '~/assets/icons/zoom-popup-icon.svg';

export const useGetLessonIcon = (type: ELessonType | Exams) => {
  const { __ } = useTranslate();

  switch (type) {
    case Exams.ASSIGNMENT:
      return { title: __('Assignment'), Icon: AssignmentIcon };
    case Exams.GOOGLE_MEET:
      return { title: __('Google meet lesson'), Icon: GoogleMeetIcon };
    case ELessonType.STREAM:
      return { title: __('Stream lesson'), Icon: StreamLessonIcon };
    case Exams.QUIZ:
      return { title: __('Quiz'), Icon: QuizIcon };
    case ELessonType.TEXT:
      return { title: __('Text lesson'), Icon: TextLessonIcon };
    case ELessonType.VIDEO:
      return { title: __('Video lesson'), Icon: VideoLessonIcon };
    case ELessonType.ZOOM:
      return { title: __('Zoom lesson'), Icon: ZoomLessonIcon };
    default:
      return { title: __('Lesson'), Icon: TextLessonIcon };
  }
};
