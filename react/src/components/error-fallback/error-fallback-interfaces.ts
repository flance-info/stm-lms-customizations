import { ELessonType, Exams } from '~/models';

export interface ErrorFallbackProps {
  message?: string;
  type?: ELessonType | Exams;
}
