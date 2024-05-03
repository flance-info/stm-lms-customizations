import { ComponentType } from 'react';
import { EQuestionType } from '../../questions-interfaces';
import { QuestionItemFormProps } from './question-item-interfaces';
import { ChoiceQuestionTypeForm } from './question-types/choice-question-type-form';
import { TrueFalseForm } from './question-types/true-false-form';
import { FillTheGapForm } from './question-types/fill-the-gap-form';
import { ItemMatchForm } from './question-types/item-match-form';
import { ImageMatchForm } from './question-types/image-match-form';
import { KeywordsForm } from './question-types/keywords-form';
import { QuizBank } from './components/quiz-bank';

export const QUESTION_FORM_BY_TYPE: {
  [key in EQuestionType]: ComponentType<QuestionItemFormProps>;
} = {
  [EQuestionType.SINGLE_CHOICE]: ChoiceQuestionTypeForm,
  [EQuestionType.MULTI_CHOICE]: ChoiceQuestionTypeForm,
  [EQuestionType.TRUE_FALSE]: TrueFalseForm,
  [EQuestionType.ITEM_MATCH]: ItemMatchForm,
  [EQuestionType.IMAGE_MATCH]: ImageMatchForm,
  [EQuestionType.KEYWORDS]: KeywordsForm,
  [EQuestionType.FILL_THE_GAP]: FillTheGapForm,
  [EQuestionType.QUESTION_BANK]: QuizBank,
};
