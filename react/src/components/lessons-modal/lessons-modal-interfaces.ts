import { ELessonType, Exams } from '~/models';

export interface Lesson {
  type: ELessonType | Exams;
  isLocked: boolean;
  visible: boolean;
}

export interface LessonsModalProps {
  sectionId?: string;
  onClose: () => void;
  isOpen: boolean;
  lessons: Lesson[];
  exams?: Lesson[];
}