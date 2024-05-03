import * as yup from 'yup';
import { EQuestionType } from '../tabs/questions/questions-interfaces';

const baseQuestionSchema = yup.object().shape({
  question: yup.string().required(),
  type: yup.string().nullable().required(),
});

const QUESTION_SCHEMAS = {
  [EQuestionType.SINGLE_CHOICE]: baseQuestionSchema.shape({
    answers: yup.array().of(yup.object().shape({
      text: yup.string().required(),
    })).min(1),
  }),
  [EQuestionType.MULTI_CHOICE]: baseQuestionSchema.shape({
    answers: yup.array().of(yup.object().shape({
      text: yup.string().required(),
    })).min(1),
  }),
  [EQuestionType.TRUE_FALSE]: baseQuestionSchema.shape({
    answers: yup.array().of(yup.object().shape({
      text: yup.string().required(),
    })).min(1),
  }),
  [EQuestionType.ITEM_MATCH]: baseQuestionSchema.shape({
    answers: yup.array().of(yup.object().shape({
      question: yup.string().required(),
      text: yup.string().required(),
    })).min(1),
  }),
  [EQuestionType.IMAGE_MATCH]: baseQuestionSchema.shape({
    answers: yup.array().min(1),
  }),
  [EQuestionType.KEYWORDS]: baseQuestionSchema.shape({
    answers: yup.array().of(yup.object().shape({
      text: yup.string().required(),
    })).min(1),
  }),
  [EQuestionType.FILL_THE_GAP]: baseQuestionSchema.shape({
    answers: yup.array().of(yup.object().shape({
      text: yup.string().required(),
    })).min(1),
  }),
  [EQuestionType.QUESTION_BANK]: yup.object().shape({
    categories: yup.array().of(yup.number()).min(1),
    answers: yup.array().of(yup.object().shape({
      text: yup.string().required(),
      number: yup.number().required(),
    })),
  }),
};

export const questionsSchema = yup.lazy(question => {
  if (!question.type || question.view_type === 'image') {
    return baseQuestionSchema;
  }

  return QUESTION_SCHEMAS[question.type as EQuestionType];
});

export const validationSchema = yup.object().shape({
  title: yup.string().required('This field is required'),
  content: yup.string(),
  duration: yup.number(),
  duration_measure: yup.string(),
  correct_answer: yup.boolean(),
  re_take_cut: yup.number(),
  passing_grade: yup.number(),
  // @ts-ignore
  questions: yup.array().of(yup.lazy(question => {
    if (!question.type) {
      return yup.mixed().nullable();
    }

    return yup.object().shape({
      id: yup.string(),
    });
  })),
});
