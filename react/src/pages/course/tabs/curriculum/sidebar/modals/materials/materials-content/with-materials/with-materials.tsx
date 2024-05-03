import { FC } from 'react';

interface WithMaterialsProps {
  hasMaterials: boolean;
  children: React.ReactNode;
}

export const WithMaterials: FC<WithMaterialsProps> = ({ hasMaterials, children }) => (
  <>{hasMaterials ? children : null}</>
);
