import { ELessonType } from '~/models';
import { getCourseBuilderSettings } from '~/common/hooks';
import { Lesson } from '~/components/lessons-modal/lessons-modal-interfaces';

export const useGetLessons = () => {
  const { data } = getCourseBuilderSettings();
  const isInstructor = data?.options.is_instructor;

  const lessons: Lesson[] = [
    {
      type: ELessonType.TEXT,
      isLocked: !data?.lesson_types.includes(ELessonType.TEXT),
      visible: !(!data?.lesson_types.includes(ELessonType.TEXT) && isInstructor),
    },
    {
      type: ELessonType.VIDEO,
      isLocked: !data?.lesson_types.includes(ELessonType.VIDEO),
      visible: !(!data?.lesson_types.includes(ELessonType.VIDEO) && isInstructor),
    },
    {
      type: ELessonType.STREAM,
      isLocked: !data?.lesson_types.includes(ELessonType.STREAM),
      visible: !(!data?.lesson_types.includes(ELessonType.STREAM) && isInstructor),
    },
    {
      type: ELessonType.ZOOM,
      isLocked: !data?.lesson_types.includes(ELessonType.ZOOM),
      visible: !(!data?.lesson_types.includes(ELessonType.ZOOM) && isInstructor),
    },
  ];

  return lessons.filter(lesson => lesson.visible);
};
