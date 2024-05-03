import { ImportMaterials, PostType, Section } from '~/models';

export interface MaterialsContentProps {
  recentMaterials: ImportMaterials[];
  onClose: () => void;
  section: Section;
}

export interface SearchTypeOption {
  id: PostType;
  label: string;
}
