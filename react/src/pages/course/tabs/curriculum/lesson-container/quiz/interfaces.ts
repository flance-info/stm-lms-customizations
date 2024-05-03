import { CustomField, Exams } from '~/models';

export interface CreateQuizFormProps {
  type: Exams.QUIZ;
  sectionId?: string;
  getEditPath: (id: number) => string;
}

export interface EditQuizFormProps {
  type: Exams.QUIZ;
  // todo fix
  quiz: any;
}

export interface QuizFormProps {
  type?: Exams.QUIZ;
  isLoading: boolean;
  fields?: CustomField[];
  isDisabled?: boolean;
}

export interface QuizProps {
  type: Exams.QUIZ;
  lessonId: string;
}
