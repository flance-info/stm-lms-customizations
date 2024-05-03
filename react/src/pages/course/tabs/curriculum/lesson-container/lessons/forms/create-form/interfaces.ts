import { ELessonType } from '~/models';

export interface CreateLessonFormProps {
  type: ELessonType;
  sectionId: string;
}
