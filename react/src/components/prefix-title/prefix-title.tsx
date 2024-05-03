import { FC, memo } from 'react';
import { Flex, Icon as ChakraIcon, Text } from '@chakra-ui/react';

import { ELessonType, Exams } from '~/models';
import { PrefixTitleProps } from './prefix-title-interfaces';
import { useTranslate } from '~/services';

import { ReactComponent as AssignmentIcon } from '~/assets/icons/assignment-icon.svg';
import { ReactComponent as GoogleMeetIcon } from '~/assets/icons/google-meet-icon.svg';
import { ReactComponent as StreamLessonIcon } from '~/assets/icons/stream-lesson-icon.svg';
import { ReactComponent as TextLessonIcon } from '~/assets/icons/text-lesson-icon.svg';
import { ReactComponent as VideoLessonIcon } from '~/assets/icons/video-lesson-icon.svg';
import { ReactComponent as QuizIcon } from '~/assets/icons/quiz-icon.svg';
import { ReactComponent as ZoomLessonIcon } from '~/assets/icons/zoom-lesson-icon.svg';

export const PrefixTitle: FC<PrefixTitleProps> = memo(({ prefixType, iconColor }) => {
  const { __ } = useTranslate();
  const getLessonOptions = (type: ELessonType | Exams) => {
    switch (type) {
      case Exams.ASSIGNMENT:
        return {
          title: __('Assignment'),
          Icon: AssignmentIcon,
        };
      case Exams.GOOGLE_MEET:
        return {
          title: __('Google meet'),
          Icon: GoogleMeetIcon,
        };
      case ELessonType.STREAM:
        return {
          title: __('Stream lesson'),
          Icon: StreamLessonIcon,
        };
      case Exams.QUIZ:
        return {
          title: __('Quiz'),
          Icon: QuizIcon,
        };
      case ELessonType.TEXT:
        return {
          title: __('Text lesson'),
          Icon: TextLessonIcon,
        };
      case ELessonType.VIDEO:
        return {
          title: __('Video lesson'),
          Icon: VideoLessonIcon,
        };
      case ELessonType.ZOOM:
        return {
          title: __('Zoom lesson'),
          Icon: ZoomLessonIcon,
        };
      default:
        return {
          title: __('Lesson'),
          Icon: TextLessonIcon,
        };
    }
  };
  const { Icon, title } = getLessonOptions(prefixType);

  return (
    <Flex gap="10px" alignItems="center">
      <ChakraIcon as={Icon} fill={iconColor}/>
      <Text fontSize="sm">{title}</Text>
    </Flex>
  );
});
