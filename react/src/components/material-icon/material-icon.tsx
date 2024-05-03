import { FC } from 'react';
import { Icon } from '@chakra-ui/react';

import { ELessonType, Exams, PostType } from '~/models';
import { MaterialIconProps } from './material-icon-interfaces';

import { ReactComponent as AssignmentIcon } from '~/assets/icons/assignment-icon.svg';
import { ReactComponent as GoogleMeetIcon } from '~/assets/icons/google-meet-icon.svg';
import { ReactComponent as QuizIcon } from '~/assets/icons/quiz-icon.svg';
import { ReactComponent as StreamLessonIcon } from '~/assets/icons/stream-lesson-icon.svg';
import { ReactComponent as TextLessonIcon } from '~/assets/icons/text-lesson-icon.svg';
import { ReactComponent as VideoLessonIcon } from '~/assets/icons/video-lesson-icon.svg';
import { ReactComponent as ZoomLessonIcon } from '~/assets/icons/zoom-lesson-icon.svg';

export const MaterialIcon: FC<MaterialIconProps> = ({ lessonType }) => {
  switch (lessonType) {
    case PostType.STM_ASSIGNMENTS:
    case Exams.ASSIGNMENT:
      return <Icon as={AssignmentIcon} fontSize="18px" fill="error"/>;
    case PostType.STM_GOOGLE_MEETS:
    case Exams.GOOGLE_MEET:
      return <Icon as={GoogleMeetIcon} fontSize="18px" fill="primary"/>;
    case PostType.STM_QUIZZES:
    case Exams.QUIZ:
      return <Icon as={QuizIcon} fontSize="18px" fill="warning"/>;
    case ELessonType.STREAM:
      return <Icon as={StreamLessonIcon} fontSize="18px" fill="#BA48F0"/>;
    case ELessonType.TEXT:
      return <Icon as={TextLessonIcon} fontSize="18px" fill="success"/>;
    case ELessonType.VIDEO:
      return <Icon as={VideoLessonIcon} fontSize="18px" fill="#EC7F00"/>;
    case ELessonType.ZOOM:
      return <Icon as={ZoomLessonIcon} fontSize="18px" fill="primary"/>;
    default:
      return <Icon as={TextLessonIcon} fontSize="18px" fill="success"/>;
  }
};
