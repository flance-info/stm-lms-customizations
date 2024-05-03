import { FC, useEffect } from 'react';
import find from 'lodash/find';
import { generatePath, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { EditLessonForm } from './lessons';
import { ELessonType, Exams } from '~/models';
import { ErrorFallback } from '~/components/error-fallback';
import { getCreateFormByType, getEditExamFormByType } from './lesson-container-utils';
import { Loader } from '~/components/loader';
import { useApi } from '~/services';
import { useGetSections } from '~/common/hooks';

export const LessonContainer: FC = () => {
  const {
    courseId,
    lessonId,
    sectionId,
    lessonType,
  } = useParams<{ courseId: string; lessonId?: string; sectionId: string, lessonType?: Exams }>();
  const [params] = useSearchParams();
  const type = params.get('type') as ELessonType | Exams;
  const api = useApi();
  const navigate = useNavigate();

  useEffect(() => {
      window.scrollTo(0, 0);
  }, [type, sectionId]);

  if (!courseId) return null;

  const { data: curriculum } = useGetSections(courseId);

  const { data, isLoading, error } = useQuery(['lesson', lessonId], ({ queryKey }) => {
    const [, id] = queryKey;
    return api.curriculum.lessons.getBy(id);
  }, { enabled: !!lessonId && !lessonType });

  if (sectionId && !find(curriculum?.sections, { id: +sectionId })
    || lessonId && !find(curriculum?.materials, { post_id: +lessonId })) {
    const path = generatePath('/edit-course/:courseId/curriculum', { courseId });
    navigate(path);
  }

  if (type && sectionId) {
    const CreateForm = getCreateFormByType(type, sectionId);
    return CreateForm;
  }

  if (lessonType && lessonId) {
    const EditExamForm = getEditExamFormByType(lessonType, lessonId);
    return EditExamForm;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorFallback/>;
  }

  return <EditLessonForm lesson={data.lesson} key={data.lesson.id} fields={data.custom_fields}/>;
};
