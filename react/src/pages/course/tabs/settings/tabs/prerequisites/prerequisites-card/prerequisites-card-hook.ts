import { useFormContext } from 'react-hook-form';

import { Course } from '~/models';

export const usePrerequisitesCardHook = (name: string) => {
  const { setValue, watch } = useFormContext();
  const courses: Course[] = watch(name);

  const removeCourseHandler = (id: number) => {
    const value = courses.filter((course) => course.id !== id);
    setValue(name, value, { shouldDirty: true });
  };

  return {
    courses,
    removeCourseHandler,
  };
};
