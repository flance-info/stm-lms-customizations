import { CustomField, Lesson } from '~/models';

export interface EditLessonFormProps {
  lesson: Lesson;
  fields: CustomField[];
}

export interface EditLessonFormContainerProps {
  lessonId?: string;
}
