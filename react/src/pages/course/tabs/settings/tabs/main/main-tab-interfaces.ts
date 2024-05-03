import { CoInstructor, Media } from '~/models';

export interface MainTabFormValues {
  title: string;
  slug: string;
  category: number[];
  level: string | null;
  image: Media | null;
  duration_info: string | null;
  video_duration: string | null;
  co_instructor: CoInstructor | null;
  content: string | null;
  excerpt: string | null;
  status: string | null;
  status_date_start: number | null;
  status_date_end: number | null;
  views: number | null;
  current_students: number | null;
  is_featured: boolean;
  access_duration: string | null;
  access_devices: string | null;
  certificate_info: string | null;
}
