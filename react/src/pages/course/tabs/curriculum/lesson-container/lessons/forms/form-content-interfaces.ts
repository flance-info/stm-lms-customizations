import { CustomField, ELessonType } from '~/models';

export interface FormContentProps {
  type: ELessonType;
  isLoading: boolean;
  isDisabled?: boolean;
  fields?: CustomField[];
}
