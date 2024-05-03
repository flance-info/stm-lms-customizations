import { EQuestionType, ETypedQuestions } from '../../questions-interfaces';

export interface QuestionItemProps {
  onRemoveClick: () => void;
  onAddQuestionClick: (type: ETypedQuestions) => void;
  onAddBankClick: () => void;
  quizId: number;
  newFieldIndex: number;
  index: number;
}

export interface QuestionItemFormProps {
  type: EQuestionType;
}
