import queryString from 'query-string';
import { APIResource } from '~/services/resources/interfaces';
import {
  EQuestionType,
  QuizQuestionModel,
} from 'pages/course/tabs/curriculum/lesson-container/quiz/tabs/questions/questions-interfaces';
import { question, quiz } from '~/services/resources/quiz/converters';
import { BaseMedia } from '~/models';

export interface QuizModel {
  id: string;
  title: string,
  content: string,
  correct_answer: boolean,
  duration: number,
  duration_measure: string,
  excerpt: string,
  passing_grade: number,
  quiz_attempts: number,
  random_questions: boolean,
  re_take_cut: number,
  style: string,
  questions: QuizQuestionModel[];
}

export interface AnswerModel {
  isTrue?: number;
  question?: string;
  text?: string;
  text_image?: BaseMedia;
  question_image?: BaseMedia;
  number?: number;
  categories?: number[];
  explain?: string;
}

export interface QuestionMedia{
  type: string;
  title: string;
  id: number;
  url: string;
}

export interface QuestionModel {
  answers: AnswerModel[],
  categories: string[],
  explain: string,
  hint: string,
  image: BaseMedia | object,
  question: string,
  type: EQuestionType,
  view_type: 'grid' | 'list' | 'image';
  video?: QuestionMedia[],
  video_poster?: QuestionMedia[],
  video_type?: string
}

export class QuizResource extends APIResource {
  create = (quizPayload: QuizModel) => {
    const data = quiz.to(quizPayload);
    return this._provider.post('/quizzeschild', data);
  };
  get = async (quizId: string) => {
    const data = await this._provider.get(`/quizzeschild/${quizId}`);
    return { quiz: quiz.from(data.quiz), custom_fields: data.custom_fields };
  };
  update = (values: QuizModel) => {
    const data = quiz.to(values);
    return this._provider.put(`/quizzeschild/${values.id}`, data);
  };
  updateQuestions = (quizId: string, questions: (string|number)[]) =>
    this._provider.put(`/quizzes/${quizId}/questions`, { questions });

  questions = {
    create: (questionPayload: QuizQuestionModel) => {
      const data = question.to(questionPayload);
      return this._provider.post('/questions', data);
    },
    get: (questionId: string | number) => this._provider.get(`/questions/${questionId}`),
    list: (category: string, search: string) => {
      const searchParams = queryString.stringify({ category, search });
      return this._provider.get(`/questions/?${searchParams}`);
    },
    remove: (questionId: string | number) => this._provider.remove(`/questions/${questionId}`),
    update: (questionId: string | number, questionPayload: QuizQuestionModel) => {
      const data = question.to(questionPayload);
      if (data.video_type !== '') {
        // @ts-ignore
        data.video_poster = (data.video_poster && data.video_poster.id > 0) ? data.video_poster.id : undefined;
        // @ts-ignore
        data.video = data.video ? data.video.id : undefined;
      }
      return this._provider.put(`/questions/${questionId}`, data);
    },
    categories: () => this._provider.get('/questions/categories'),
    createCategory: (category: any) => this._provider.post('/questions/category', category),
  };
}

