import {
  EQuestionType,
  ETypedQuestions,
  QuizBankModel,
  TypedQuestionModel,
} from '../../questions-interfaces';

export const generateQuestionDummy = (type: ETypedQuestions): TypedQuestionModel => ({
  type,
  image: {},
  categories: [],
  question: '',
  answers: [],
  ...(type === EQuestionType.IMAGE_MATCH ? {
    view_type: 'list',
  } : {}),
  ...(type === EQuestionType.TRUE_FALSE ? {
    answers: [{ text: 'True', isTrue: 1 }, { text: 'False', isTrue: 0 }]
  } : {}),
});

export const generateBankDummy = (): QuizBankModel => ({
  type: EQuestionType.QUESTION_BANK,
  categories: [],
  answers: [{
    text: '',
    number: 5,
  }],
});
