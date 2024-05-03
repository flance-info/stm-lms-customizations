import { useMutation } from 'react-query';

import { UpdateMaterialPayload } from '~/services/resources/curriculum/curriculum';
import { useApi } from '~/services';
import { useCourse } from 'pages/course/course-page-hooks';

export const useUpdateMaterials = (courseId: string) => {
  const api = useApi();
  const { invalidate } = useCourse();

  return useMutation(
    (materialPayload: UpdateMaterialPayload) => {
      return api.curriculum.materials.update(courseId, materialPayload);
    }, {
      onSuccess: () => {
        invalidate();
      },
    });
};
