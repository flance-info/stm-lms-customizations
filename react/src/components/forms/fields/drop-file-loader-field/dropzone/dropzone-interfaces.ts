import { Media } from '~/models';

export type DropzoneType = 'video' | 'image' | 'default';

export interface DropzoneProps {
  type?: DropzoneType;
  name: string;
  value: Media | null;
}
