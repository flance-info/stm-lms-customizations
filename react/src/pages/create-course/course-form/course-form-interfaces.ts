import { Media } from '~/models';

export interface CourseFormValues {
  title: string;
  slug: string;
  image: Media | null;
  category: number[];
  level: string;
}
