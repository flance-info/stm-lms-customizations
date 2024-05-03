import { CourseFile } from '~/models';

export interface FileCardProps {
  name: string;
  file: CourseFile;
  removeFile: () => void;
}