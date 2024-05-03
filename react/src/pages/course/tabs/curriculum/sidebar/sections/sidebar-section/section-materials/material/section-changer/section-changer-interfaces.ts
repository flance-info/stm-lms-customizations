import { Material } from '~/models';

export interface SectionChangerProps {
  sectionId: number;
  material: Material;
}

export interface SectionChangerFormValues {
  sectionId: number | null;
}
