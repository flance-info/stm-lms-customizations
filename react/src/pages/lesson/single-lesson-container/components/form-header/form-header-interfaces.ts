import { ELessonType, Exams } from '~/models';

export interface FormHeaderProps {
  type: ELessonType | Exams;
  placeholder: string;
  isLoading: boolean;
  isNew: boolean;
  isDisabled?: boolean;
  id?: number;
}
