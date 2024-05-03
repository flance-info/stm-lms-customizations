import { generatePath, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import { Exams, GoogleMeet, ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useCourse } from '../../../../../../course-page-hooks';
import { useErrorToastOptions } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const useCreateGoogleMeet = (
  sectionId: string,
  type: Exams.GOOGLE_MEET,
  reset: (values: GoogleMeet) => void
) => {
  const api = useApi();
  const toast = useToast();
  const { __ } = useTranslate();
  const { courseId, invalidate } = useCourse();
  const navigate = useNavigate();

  const navigateToEditGoogleMeet = (id: number) => {
    if (courseId) {
      const path = generatePath(
        '/edit-course/:courseId/curriculum/sections/:sectionId/:lessonType/:lessonId',
        { courseId, sectionId, lessonId: id.toString(), lessonType: type }
      );
      navigate(path);
    }
  };

  const createGoogleMeet = useMutation(api.curriculum.googleMeet.create, {
    onSuccess: () => {
      toast({ message: __('Google meet successfully created'), type: TOAST_STATUS.SUCCESS });
    },
    onError: (error: ServerError) => {
      const errorToastOptions = useErrorToastOptions(error, __('Failed to create an Google meet'));
      toast(errorToastOptions);
    },
  });

  const createMaterial = useMutation(api.curriculum.materials.create);

  const onCreateGoogleMeet = async (values: GoogleMeet) => {
    const response = await createGoogleMeet.mutateAsync(values);
    const data = { post_id: response.id, section_id: Number(sectionId) };
    await createMaterial.mutateAsync({ courseId, data });
    reset(values);
    await invalidate();
    await navigateToEditGoogleMeet(response.id);
  };

  return {
    onCreateGoogleMeet,
    isLoading: createMaterial.isLoading || createMaterial.isSuccess || createMaterial.isLoading,
  };
};
