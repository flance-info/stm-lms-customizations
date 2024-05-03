import { generatePath } from 'react-router-dom';

import { CreateAssignmentForm, EditAssignmentFormContainer } from './assignment';
import { CreateGoogleMeetForm, EditGoogleMeetFormContainer } from './google-meet';
import { CreateQuizForm } from 'pages/course/tabs/curriculum/lesson-container/quiz/forms';
import { ErrorFallback } from '~/components/error-fallback';
import { Exams } from '~/models';
import { Quiz } from '../../course/tabs/curriculum/lesson-container/quiz';

export const getCreateFormByType = (type: string) => {
  switch (type) {
    case Exams.ASSIGNMENT:
      return <CreateAssignmentForm type={type}/>;
    case Exams.GOOGLE_MEET:
      return <CreateGoogleMeetForm type={type}/>;
    case Exams.QUIZ:
      return (
        <CreateQuizForm
          type={type}
          getEditPath={(id) => generatePath('./:lessonId', { lessonId: id.toString() })}
        />
      );
    default:
      return <ErrorFallback message={`Lesson type ${type} is not supported`} />;
  }
};

export const getEditExamFormByType = (type: string, lessonId: string) => {
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
