import { Course } from '~/models';

export interface SelectCourseProps {
  changeRoute: (path: string) => void;
  onClose: () => void;
  recentCourses: Course[];
}