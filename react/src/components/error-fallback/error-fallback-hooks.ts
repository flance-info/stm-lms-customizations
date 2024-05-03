import { ELessonType, Exams } from '~/models';
import { EPlugin } from '~/common/constants';
import { getCourseBuilderSettings, useLessonPageType } from '~/common/hooks';
import { useTranslate } from '~/services';

const useGetLabelByType = (type?: ELessonType | Exams) => {
  const { __ } = useTranslate();
  switch (type) {
    case Exams.ASSIGNMENT:
      return __('Back to assignments');
    case Exams.GOOGLE_MEET:
      return __('Back to google meets');
    case Exams.QUIZ:
      return __('Back to quizzes');
    default:
      return __('Back to lessons');
  }
};

export const useGetPropsByLesson = (type?: ELessonType | Exams) => {
  const { isSingleLessonPage } = useLessonPageType();

  if (isSingleLessonPage) {
    const { data } = getCourseBuilderSettings();
    const isExistLmsPro = data ? data.plugins[EPlugin.LMS_PRO] : false;
    const onClick = () => {
      window.open(data?.urls.dashboard_posts + 'stm-lessons', '_self');
    };
    const label = isExistLmsPro ? useGetLabelByType(type) : '';

    return { onClick, label };
  }
};
