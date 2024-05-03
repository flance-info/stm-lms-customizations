import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';

import { ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useErrorToastOptions } from '~/common/hooks';
import { useToast } from '~/components/toast';

interface UseAddToCourseApiProps {
  courseId: string;
  sectionId?: number;
  onClose: () => void;
  changeRoute: (path: string) => void;
}

export const useAddToCourseApi = ({ courseId, sectionId, onClose, changeRoute }: UseAddToCourseApiProps) => {
  const api = useApi();
  const { __ } = useTranslate();
  const toast = useToast();
  const { lessonId } = useParams<{ lessonId: string }>();

  const createMaterial = useMutation(api.curriculum.materials.create, {
    onSuccess: () => {
      toast({ message: __('Successfully added to the course'), type: TOAST_STATUS.SUCCESS });
      onClose();
      changeRoute('courses');
    },
    onError: (err: ServerError) => {
      const errorToastOptions = useErrorToastOptions(err, __('Failed to add to course'));
      toast(errorToastOptions);
    },
  });

  const addToCourseHandler = () => {
    if (sectionId && lessonId) {
      const data = { post_id: +lessonId, section_id: sectionId };
      createMaterial.mutate({ courseId: courseId, data });
    }
  };

  return { addToCourseHandler, createMaterial };
};
