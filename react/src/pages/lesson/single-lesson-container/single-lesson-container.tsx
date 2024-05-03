import { FC } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

import { CreateLessonForm, EditLessonFormContainer } from './lessons';
import { ELessonType } from '~/models';
import { getCreateFormByType, getEditExamFormByType } from './single-lesson-container-utils';
import { getCourseBuilderSettings } from '~/common/hooks';
import { Loader } from '~/components/loader';

export const SingleLessonContainer: FC = () => {
  const { isLoading } = getCourseBuilderSettings();
  const { lessonId } = useParams<{ lessonId?: string }>();
  const [params] = useSearchParams();
  const type = params.get('type') as ELessonType;

  const location = useLocation();
  const currentPath = location.pathname;
  const start = currentPath.indexOf('-') + 1;
  const end = currentPath.indexOf('/', start);
  const lessonType = currentPath.substring(start, end);
  const exams = ['assignment', 'google-meet', 'quiz'];

  if (isLoading) {
    return <Loader/>;
  }

  if (lessonType === 'lesson' && type) {
    return <CreateLessonForm key={type} type={type}/>;
  }

  if (exams.includes(lessonType) && !lessonId) {
    const CreateForm = getCreateFormByType(lessonType);
    return CreateForm;
  }

  if (exams.includes(lessonType) && lessonId) {
    const EditExamForm = getEditExamFormByType(lessonType, lessonId);
    return EditExamForm;
  }

  return <EditLessonFormContainer lessonId={lessonId}/>;
};
