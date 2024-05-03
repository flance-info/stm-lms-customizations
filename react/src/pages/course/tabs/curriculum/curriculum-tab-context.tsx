import { createContext, FC, ReactNode, useContext, useState } from 'react';
import noop from 'lodash/noop';

import { ELessonType, Exams } from '~/models';

type NewMaterial = { title: string, type: ELessonType | Exams } | null;
type TCurriculumContext = {
  newMaterial: NewMaterial;
  setNewMaterial: (newMaterial: NewMaterial) => void;
};

export const CurriculumContext = createContext<TCurriculumContext>({
  newMaterial: null,
  setNewMaterial: () => noop,
});

export const CurriculumContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [newMaterial, setNewMaterial] = useState<NewMaterial>(null);

  return (
    <CurriculumContext.Provider value={{ newMaterial, setNewMaterial }}>
      {children}
    </CurriculumContext.Provider>
  );
};

export const useCurriculumContext = () => useContext(CurriculumContext);
