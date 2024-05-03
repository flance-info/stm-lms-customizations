import { Exams } from '~/models';

export interface CreateAssignmentFormProps {
  type: Exams.ASSIGNMENT;
  sectionId: string;
}
