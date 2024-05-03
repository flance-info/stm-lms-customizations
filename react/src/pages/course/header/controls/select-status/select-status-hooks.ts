import { useState } from 'react';
import { useMutation } from 'react-query';

import { CourseStatus } from './select-status-interfaces';
import { ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useCourseData, useErrorToastOptions } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const useGetStatusOptions = () => {
  const { data } = useCourseData();
  const { __ } = useTranslate();
  let statuses: CourseStatus[] = [];

  const isPremoderation = data.options.course_premoderation;
  const isInstructor = data.options.is_instructor;

  if (!isPremoderation) {
    statuses = [
      { id: 'draft', label: __('Make draft') },
      { id: 'publish', label: __('Publish') },
    ];
  }

  if (isPremoderation) {
    if (!isInstructor) {
      statuses = [
        { id: 'draft', label: __('Make draft') },
        { id: 'publish', label: __('Publish') },
      ];
    } else {
      statuses = [
        { id: 'draft', label: __('Make draft') },
        { id: 'pending', label: __('Publish') },
      ];
    }
  }

  return { statuses, courseStatus: data.course.status, isPremoderation, isInstructor };
};

export const useSelectStatusControl = (courseId: string, courseStatus: string) => {
  const [selectedStatus, setSelectedStatus] = useState<string>(courseStatus);

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'pending':
        return __('Course has been sent for review');
      case 'draft':
        return __('Course has been saved as draft');
      case 'publish':
        return __('Course has been published successfully');
      default:
        return __('Course status has been changed');
    }
  };

  const { __ } = useTranslate();
  const toast = useToast();
  const api = useApi();
  const { mutate } = useMutation(api.course.updateStatus, {
    onSuccess: (response) => {
      toast({
        message: getStatusMessage(response.status),
        type: TOAST_STATUS.SUCCESS
      });
      setSelectedStatus(response.status);
    },
    onError: (error: ServerError) => {
      const errorToastOptions = useErrorToastOptions(error, __('Failed to update course status'));
      toast(errorToastOptions);
    },
  });

  const onChangeStatus = (statusId: string) => {
    mutate({ id: courseId, status: statusId });
  };

  return { selectedStatus, onChangeStatus };
};
