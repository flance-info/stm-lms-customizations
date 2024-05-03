import { generatePath, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import { NewLesson, ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useCourse } from '../../../../../../course-page-hooks';
import { useErrorToastOptions } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const useCreateLesson = (sectionId: string, reset: (values: NewLesson) => void) => {
  const api = useApi();
  const toast = useToast();
  const { __ } = useTranslate();
  const { courseId, invalidate } = useCourse();
  const navigate = useNavigate();

  const navigateToEditLesson = (id: number) => {
    if (courseId) {
      const path = generatePath(
        '/edit-course/:courseId/curriculum/sections/:sectionId/lessons/:lessonId',
        { courseId, lessonId: id.toString(), sectionId }
      );
      navigate(path);
    }
  };

  const createLesson = useMutation(api.curriculum.lessons.create, {
    onSuccess: async () => {
      toast({ message: __('Lesson has been added successfully'), type: TOAST_STATUS.SUCCESS });
    },
    onError: (error: ServerError) => {
      const errorToastOptions = useErrorToastOptions(error, __('Failed to create lesson'));
      toast(errorToastOptions);
    },
  });

  const createMaterial = useMutation(api.curriculum.materials.create);

  const onCreateLesson = async (values: NewLesson) => {
    const response = await createLesson.mutateAsync(values);
    const data = { post_id: response.id, section_id: Number(sectionId) };
    await createMaterial.mutateAsync({ courseId, data });
    reset(values);
    await invalidate();
    await navigateToEditLesson(response.id);
  };

  return { onCreateLesson, isLoading: createLesson.isLoading || createLesson.isSuccess || createMaterial.isLoading };
};
