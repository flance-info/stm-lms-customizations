import { Exams, PostType } from '~/models';

export const getExamsType = (type: PostType) => {
  switch (type) {
    case PostType.STM_ASSIGNMENTS:
      return Exams.ASSIGNMENT;
    case PostType.STM_GOOGLE_MEETS:
      return Exams.GOOGLE_MEET;
    case PostType.STM_QUIZZES:
      return Exams.QUIZ;
    default:
      return '';
  }
};
