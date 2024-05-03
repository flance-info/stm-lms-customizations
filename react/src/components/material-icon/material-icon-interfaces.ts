import { ELessonType, Exams, PostType } from 'models';

export interface MaterialIconProps {
  lessonType: ELessonType | PostType | Exams;
}
