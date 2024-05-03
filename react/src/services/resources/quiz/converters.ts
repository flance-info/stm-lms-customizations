import isUndefined from 'lodash/isUndefined';

import { AnswerModel, QuestionModel, QuizModel } from '~/services/resources/quiz/quiz';
import {
  EQuestionType,
  QuizQuestionModel,
} from '../../../pages/course/tabs/curriculum/lesson-container/quiz/tabs/questions/questions-interfaces';

export const question = {
  to: (data: any): QuestionModel => ({
    ...data,
    answers: data.answers.map((answer: AnswerModel) => ({ ...answer, text: answer.text?.trim() })),
    image: data.image || {},
    explain: '',
    hint: '',
    view_type: data.view_type || 'list',
    ...(data.type === EQuestionType.QUESTION_BANK && {
      question: data.answers[0]?.text || 'bank',
    })
  }),
};

export const quiz = {
  // TODO fix typing
  to: (data: any): QuizModel => {
    const { custom_fields } = data;
    for (const key in custom_fields) {
      if (isUndefined(custom_fields[key])) {
        custom_fields[key] = '';
      }
    }

    return {
      ...data,
      custom_fields,
      // @ts-ignore
      questions: data.questions.reduce<string[]>((acc: string[], question: any) => {
        const id = question.id;
        if (!id) {
          return acc;
        }

        return [...acc, id];
      }, []),
    };
  },
  from: (data: any): QuizModel => {
    const questions = Array.isArray(data.questions) ? data.questions : Object.values(data.questions || {});

    return {
      ...data,
      questions: questions.map((question: QuizQuestionModel) => ({
        ...question,
        categories: question.categories.map((category: any) => category.id),
      })),
    };
  },
};
