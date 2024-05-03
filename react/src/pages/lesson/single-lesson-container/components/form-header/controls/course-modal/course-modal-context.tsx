import { createContext, FC, useContext, useState } from 'react';
import { Course } from '~/models';

interface ICourseContext {
  course: Course | undefined;
  onChangeCourse: (course?: Course) => void;
}

interface CourseContextProviderProps {
  children: React.ReactNode;
}

const CourseContext = createContext<ICourseContext>(undefined!);

export const CourseContextProvider: FC<CourseContextProviderProps> = ({ children }) => {
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const onChangeCourse = (course?: Course) => setCourse(course);

  return (
    <CourseContext.Provider value={{ course, onChangeCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => useContext(CourseContext);