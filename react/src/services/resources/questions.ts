import { APIResource } from './interfaces';
import { Question } from 'pages/course/tabs/curriculum/lesson-container/quiz/tabs/questions/questions-interfaces';

export type QuestionsGetResponse = Question[];

export class QuestionsResource extends APIResource {
  get = () => this._provider.get<QuestionsGetResponse>('/questions');
}
