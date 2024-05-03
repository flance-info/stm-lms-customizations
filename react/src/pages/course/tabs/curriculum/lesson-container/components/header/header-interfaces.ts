import { ELessonType, Exams } from '~/models';

export interface HeaderProps {
  type: ELessonType | Exams;
  placeholder: string;
  label: string;
  isLoading: boolean;
  isDisabled?: boolean;
  id?: number;
}
