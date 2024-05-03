import { ImportMaterials } from '~/models';

export interface MaterialProps {
  materials: ImportMaterials[];
  onToggle: (id: number) => void;
  getIsChecked: (id: number) => boolean;
  title: string;

  onChangeCheckbox: (event: React.ChangeEvent<HTMLInputElement>, id: number) => void;
}
