import { DripItem, Material, Section } from '~/models';

export interface FormContainerProps {
  sections: Section[];
  materials: Material[];
  courseId: string;
}

export interface FormProps extends FormContainerProps {
  drip: { materials: DripItem[] }[];
}

export interface FormValues {
  dependencies: { materials: DripItem[] }[];
}
