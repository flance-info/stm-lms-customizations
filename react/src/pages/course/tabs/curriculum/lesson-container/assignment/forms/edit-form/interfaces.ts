import { Assignment, Exams } from '~/models';

export interface EditAssignmentFormProps {
  type: Exams.ASSIGNMENT;
  assignment: Assignment;
}

export interface EditAssignmentFormContainerProps {
  type: Exams.ASSIGNMENT;
  lessonId: string;
}
