import { generatePath, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import { Assignment, Exams, ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useCourse } from '../../../../../../course-page-hooks';
import { useErrorToastOptions } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const useCreateAssignment = (
  sectionId: string,
  type: Exams.ASSIGNMENT,
  reset: (values: Assignment) => void,
) => {
  const api = useApi();
  const toast = useToast();
  const { __ } = useTranslate();
  const { courseId, invalidate } = useCourse();
  const navigate = useNavigate();

  const navigateToEditAssignment = (id: number) => {
    if (courseId) {
      const path = generatePath(
        '/edit-course/:courseId/curriculum/sections/:sectionId/:lessonType/:lessonId',
        { courseId, sectionId, lessonId: id.toString(), lessonType: type }
      );
      navigate(path);
    }
  };

  const createAssignment = useMutation(api.curriculum.assignment.create, {
    onSuccess: () => toast({ message: __('Assignment successfully created'), type: TOAST_STATUS.SUCCESS }),
    onError: (error: ServerError) => {
      const errorToastOptions = useErrorToastOptions(error, __('Failed to create an assignment'));
      toast(errorToastOptions);
    },
  });

  const createMaterial = useMutation(api.curriculum.materials.create);

  const onCreateAssignment = async (values: Assignment) => {
    const response = await createAssignment.mutateAsync(values);
    const data = { post_id: response.id, section_id: Number(sectionId) };
    await createMaterial.mutateAsync({ courseId, data });
    reset(values);
    await invalidate();
    await navigateToEditAssignment(response.id);
  };

  return {
    onCreateAssignment,
    isLoading: createAssignment.isLoading || createAssignment.isSuccess || createMaterial.isLoading,
  };
};
