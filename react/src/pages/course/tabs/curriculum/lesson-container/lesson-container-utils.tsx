import { generatePath } from 'react-router-dom';
import { ErrorFallback } from '~/components/error-fallback';
import { ELessonType, Exams } from '~/models';
import { useCourse } from '../../../course-page-hooks';

import { CreateAssignmentForm, EditAssignmentFormContainer } from './assignment';
import { CreateGoogleMeetForm, EditGoogleMeetFormContainer } from './google-meet';
import { CreateLessonForm } from './lessons';
import { Quiz } from './quiz';
import { CreateQuizForm } from './quiz/forms';

export const getCreateFormByType = (type: ELessonType | Exams, sectionId: string) => {
  const { courseId } = useCourse();

  switch (type) {
    case Exams.ASSIGNMENT:
      return <CreateAssignmentForm type={type} sectionId={sectionId}/>;
    case Exams.GOOGLE_MEET:
      return <CreateGoogleMeetForm type={type} sectionId={sectionId}/>;
    case Exams.QUIZ:
      return <CreateQuizForm
        type={type}
        getEditPath={(id) =>
          courseId ? generatePath(
            '/edit-course/:courseId/curriculum/sections/:sectionId/quiz/:quizId',
            { courseId, sectionId, quizId: id.toString() },
          )
            : ''
        }
        sectionId={sectionId}
      />;
    case ELessonType.TEXT:
    case ELessonType.VIDEO:
    case ELessonType.STREAM:
    case ELessonType.ZOOM:
      return <CreateLessonForm type={type} sectionId={sectionId} key={type}/>;
    default:
      return <ErrorFallback message={`Lesson type ${type} is not supported`} />;
}
};

export const getEditExamFormByType = (type: Exams, lessonId: string) => {
  switch (type) {
    case Exams.ASSIGNMENT:
      return <EditAssignmentFormContainer type={type} lessonId={lessonId}/>;
    case Exams.GOOGLE_MEET:
      return <EditGoogleMeetFormContainer type={type} lessonId={lessonId}/>;
    case Exams.QUIZ:
      return <Quiz type={type} lessonId={lessonId} />;
    default:
      return <ErrorFallback message={`Exam type ${type} is not supported`} />;
  }
};
