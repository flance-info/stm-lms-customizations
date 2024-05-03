import { Course } from '~/models';

export interface PrerequisitesTabFormValues {
  passing_level: number | null;
  courses: Course[];
}
