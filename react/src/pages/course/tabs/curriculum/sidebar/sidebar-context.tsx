import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { CurriculumResponse } from '~/services/resources/curriculum/curriculum';
import { useGetSections } from '~/common/hooks';
import { useCourse } from '../../../course-page-hooks';
import { Loader } from '~/components/loader';
import { ErrorFallback } from '~/components/error-fallback';
import { Material } from '~/models';

type NewSectionId = number | null;
type ISidebarContext = CurriculumResponse & {
  courseId: string,
  groupedBySections: Record<string, Material[]>,
  newSectionId: NewSectionId,
  setNewSectionId: (id: NewSectionId) => void,
};
const SidebarContext = createContext<ISidebarContext>(null!);

export const WithSidebarContext: FC<{ children: ReactNode }> = ({ children }) => {
  const { courseId } = useCourse();
  const [newSectionId, setNewSectionId] = useState<NewSectionId>(null);
  if (!courseId) return null;
  const { data, isLoading, isSuccess } = useGetSections(courseId);

  if (!data && isLoading) {
    return <Loader />;
  }

  if (isSuccess && !data) {
    return <ErrorFallback />;
  }

  if (isSuccess && data) {
    return (
      <SidebarContext.Provider value={{
        ...data,
        courseId,
        newSectionId,
        setNewSectionId,
      }}>
        {children}
      </SidebarContext.Provider>
    );
  }

  return null;
};

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};
