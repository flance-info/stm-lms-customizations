import { useMutation } from 'react-query';

import { CourseMaterialsFormValues } from './course-materials-interfaces';
import { MaterialsPayload } from '~/services/resources/interfaces';
import { ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useErrorToastOptions, useInvalidate } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const useUpdateCourseMaterials = (courseId: string, reset: (values: CourseMaterialsFormValues) => void) => {
  const api = useApi();
  const { __ } = useTranslate();

  const toast = useToast();
  const invalidate = useInvalidate(['settings', courseId]);

  const { mutate, isLoading } = useMutation((payload: MaterialsPayload) => {
    return api.settings.updateCourseMaterials(payload);
  }, {
    onSuccess: () => {
      toast({ message: __('Course materials successfully saved'), type: TOAST_STATUS.SUCCESS });
      invalidate();
    },
    onError: (err: ServerError) => {
      const errorToastOptions = useErrorToastOptions(err, __('Failed to save course materials'));
      toast(errorToastOptions);
    },
  });

  const onUpdateCourseMaterials = async (values: CourseMaterialsFormValues) => {
    await mutate({ files: values.files, id: courseId });
    reset(values);
  };

  return { isLoading, onUpdateCourseMaterials };
};
