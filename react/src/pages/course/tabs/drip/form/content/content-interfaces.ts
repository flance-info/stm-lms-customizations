import { Material, Section } from '~/models';

export interface ContentProps {
  sections: Section[];
  materials: Material[];
  isLoading: boolean;
  isDisabled?: boolean;
  showContent: boolean;
}
