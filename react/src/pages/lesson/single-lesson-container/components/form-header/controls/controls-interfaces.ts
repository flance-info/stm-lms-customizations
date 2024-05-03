import { ELessonType, Exams } from '~/models';

export interface ControlsProps {
  isLoading: boolean;
  isNew: boolean;
  isDisabled?: boolean;
  type: ELessonType | Exams;
}
