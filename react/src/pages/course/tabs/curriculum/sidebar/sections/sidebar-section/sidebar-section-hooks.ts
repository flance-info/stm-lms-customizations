import { useMutation, useQueryClient } from 'react-query';

import { EAddon, EPlugin, TOAST_STATUS } from '~/common/constants';
import { ELessonType, Exams, ServerError } from '~/models';
import { IGetSections, useCourseData, useErrorToastOptions, useHasPluginsOrAddons } from '~/common/hooks';
import { Lesson } from '~/components/lessons-modal/lessons-modal-interfaces';
import { moveWithOrder } from '~/helpers/array';
import { UpdateMaterialPayload } from '~/services/resources/curriculum/curriculum';
import { useApi, useTranslate } from '~/services';
import { useCourse } from 'pages/course/course-page-hooks';
import { useToast } from '~/components/toast';

export const useSidebarSectionHook = () => {
  const { courseId, invalidate } = useCourse();
  const api = useApi();
  const { __ } = useTranslate();
  const toast = useToast();

  const { mutate, isLoading } = useMutation(
    (sectionId: number) => {
      if (!courseId) throw new Error('Section id is not defined');
      return api.curriculum.sections.delete(courseId, sectionId);
    },
    {
      onSuccess: () => {
        toast({ message: __('Section successfully removed'), type: TOAST_STATUS.SUCCESS });
        invalidate();
      },
      onError: (err: ServerError) => {
        const errorToastOptions = useErrorToastOptions(err, __('Failed to remove section'));
        toast(errorToastOptions);
      },
    },
  );

  return {
    removeCourseSection: mutate,
    isLoading,
  };
};

export const useUpdateMaterials = (courseId: string) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const { queryKey } = useCourse();

  return useMutation(
    (materialPayload: UpdateMaterialPayload) => {
      return api.curriculum.materials.update(courseId, materialPayload);
    },
    {
      onMutate: async (materialPayload: UpdateMaterialPayload) => {
        await queryClient.cancelQueries(queryKey);

        const data = queryClient.getQueryData<IGetSections>(queryKey);
        if (!data) return { previousData: {} };

        const { groupedBySections } = data;

        const sectionMaterials = groupedBySections[materialPayload.section_id];
        const oldIndex = sectionMaterials.findIndex((material) => material.id === materialPayload.id);
        const newIndex = materialPayload.order - 1;

        const newMaterials = moveWithOrder(sectionMaterials, oldIndex, newIndex);
        queryClient.setQueryData<IGetSections>(queryKey, {
          ...data,
          groupedBySections: {
            ...groupedBySections,
            [materialPayload.section_id]: newMaterials,
          },
        });

        return { previousData: data };
      },
      onError: (err, newMaterial, context) => {
        queryClient.setQueryData(queryKey, context?.previousData);
      },
    },
  );
};

export const useGetLessons = () => {
  const { hasAddon, hasPlugin } = useHasPluginsOrAddons();
  const { data } = useCourseData();
  const isInstructor = data.options.is_instructor;

  const LESSONS: Lesson[] = [
    {
      type: ELessonType.TEXT,
      isLocked: !data.lesson_types.includes(ELessonType.TEXT),
      visible: !(!data.lesson_types.includes(ELessonType.TEXT) && isInstructor),
    },
    {
      type: ELessonType.VIDEO,
      isLocked: !data.lesson_types.includes(ELessonType.VIDEO),
      visible: !(!data.lesson_types.includes(ELessonType.VIDEO) && isInstructor),
    },
    {
      type: ELessonType.STREAM,
      isLocked: !data.lesson_types.includes(ELessonType.STREAM),
      visible: !(!data.lesson_types.includes(ELessonType.STREAM) && isInstructor),
    },
    {
      type: ELessonType.ZOOM,
      isLocked: !data.lesson_types.includes(ELessonType.ZOOM),
      visible: !(!data.lesson_types.includes(ELessonType.ZOOM) && isInstructor),
    },
    {
      type: Exams.GOOGLE_MEET,
      isLocked: !hasAddon(EAddon.GOOGLE_MEET) || !hasPlugin(EPlugin.LMS_PRO),
      visible: !((!hasAddon(EAddon.GOOGLE_MEET) || !hasPlugin(EPlugin.LMS_PRO)) && isInstructor),
    },
  ];

  const EXAMS: Lesson[] = [
    {
      type: Exams.QUIZ,
      isLocked: false,
      visible: true,
    },
    {
      type: Exams.ASSIGNMENT,
      isLocked: !hasAddon(EAddon.ASSIGNMENTS) || !hasPlugin(EPlugin.LMS_PRO),
      visible: !((!hasAddon(EAddon.ASSIGNMENTS) || !hasPlugin(EPlugin.LMS_PRO)) && isInstructor),
    },
  ];

  const lessons = LESSONS.filter(lesson => lesson.visible);
  const exams = EXAMS.filter(exam => exam.visible);

  return { lessons, exams };
};
