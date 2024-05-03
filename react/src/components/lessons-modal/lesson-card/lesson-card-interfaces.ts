import { Lesson } from '../lessons-modal-interfaces';
export interface LessonCardProps {
  onClose?: () => void;
  lesson: Lesson;
  sectionId?: string;
}