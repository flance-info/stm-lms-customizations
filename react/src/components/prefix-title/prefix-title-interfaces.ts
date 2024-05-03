import { ELessonType, Exams } from '~/models';

export interface PrefixTitleProps {
  prefixType: ELessonType | Exams;
  iconColor: string;
}