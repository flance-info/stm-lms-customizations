import { CustomField, Lesson } from '~/models';

export interface EditLessonsFormProps {
  lesson: Lesson;
  fields: CustomField[];
}
