import { useMutation } from 'react-query';

import { generatePath, useNavigate } from 'react-router-dom';
import { NewLesson, ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useErrorToastOptions } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const useCreateLesson = (reset: (values: NewLesson) => void) => {
  const api = useApi();
  const toast = useToast();
  const { __ } = useTranslate();
  const navigate = useNavigate();

  const navigateToEditLesson = (id: number) => {
    const path = generatePath('/edit-lesson/:lessonId', { lessonId: id.toString() });
    navigate(path);
  };

  const { mutate, isLoading } = useMutation(api.curriculum.lessons.create, {
    onSuccess: (response: { id: number }) => {
      toast({ message: __('Lesson successfully created'), type: TOAST_STATUS.SUCCESS });
      navigateToEditLesson(response.id);
    },
    onError: (err: ServerError) => {
      const errorToastOptions = useErrorToastOptions(err, __('Failed to create lesson'));
      toast(errorToastOptions);
    },
  });

  const onCreateLesson = (values: NewLesson) => {
    mutate(values);
    reset(values);
  };

  return { onCreateLesson, isLoading };
};
