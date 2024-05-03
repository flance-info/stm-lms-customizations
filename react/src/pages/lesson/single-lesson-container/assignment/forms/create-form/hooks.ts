import { generatePath, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import { Assignment, ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useErrorToastOptions } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const useCreateAssignment = (reset: (values: Assignment) => void) => {
  const api = useApi();
  const toast = useToast();
  const { __ } = useTranslate();

  const navigate = useNavigate();

  const navigateToEditAssignment = (id: number) => {
    const path = generatePath('./:lessonId', { lessonId: id.toString() });
    navigate(path);
  };

  const createAssignment = useMutation(api.curriculum.assignment.create, {
    onSuccess: (response: { id: number }) => {
      toast({ message: __('Assignment successfully created'), type: TOAST_STATUS.SUCCESS });
      navigateToEditAssignment(response.id);
    },
    onError: (err: ServerError) => {
      const errorToastOptions = useErrorToastOptions(err, __('Failed to create an assignment'));
      toast(errorToastOptions);
    },
  });

  const onCreateAssignment = (values: Assignment) => {
    createAssignment.mutate(values);
    reset(values);
  };

  return { onCreateAssignment, isLoading: createAssignment.isLoading };
};
