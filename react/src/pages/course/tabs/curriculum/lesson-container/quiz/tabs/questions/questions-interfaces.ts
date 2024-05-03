import { Category, Media } from '~/models';
import { AnswerModel } from '~/services/resources/quiz/quiz';

export enum EQuestionType {
  SINGLE_CHOICE = 'single_choice',
  MULTI_CHOICE = 'multi_choice',
  TRUE_FALSE = 'true_false',
  ITEM_MATCH = 'item_match',
  IMAGE_MATCH = 'image_match',
  KEYWORDS = 'keywords',
  FILL_THE_GAP = 'fill_the_gap',
  QUESTION_BANK = 'question_bank',
}

export type ETypedQuestions = Exclude<EQuestionType, EQuestionType.QUESTION_BANK>;

export interface DummyQuestion {
  type: null;
}

export type SingleChoiceAnswer = {
  text: string;
  isTrue: boolean;
};

export type QuizItemModel = {
  id?: string;
  answers: AnswerModel[];
};

export type QuizQuestionModel = QuizItemModel & {
  type: EQuestionType;
  image: Media | object;
  question: string;
  categories: string[];
};

export type QuizBankModel = QuizItemModel & {
  type: EQuestionType.QUESTION_BANK;
  categories: number[];
};

export type TypedQuestionModel = QuizQuestionModel;
export type TypedQuestionModelWithCategories = Omit<TypedQuestionModel, 'id' | 'categories'> & {
  id: string;
  categories: Category[];
};

export type Question =
  DummyQuestion
  | QuizQuestionModel
  | QuizBankModel;
