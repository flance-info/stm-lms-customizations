import { FC } from 'react';
import { useDroppable } from '@dnd-kit/core';

import { DragDropItem } from '~/components/drag-drop/DragDropItem';
import { Material as MaterialModel, Section } from '~/models';
import { Material } from './material';
import { NewMaterial } from './new-material';

interface SectionMaterialsProps {
  materials: MaterialModel[];
  section: Section;
}

export const SectionMaterials: FC<SectionMaterialsProps> = ({ materials, section }) => {
  const { setNodeRef } = useDroppable({
    id: 'materials',
  });

  return (
    <div ref={setNodeRef}>
      {materials.map((material) => (
        <DragDropItem draggableId={material.id} key={material.id}>
          <Material key={material.id} material={material} sectionId={section.id} />
        </DragDropItem>
      ))}
      <NewMaterial sectionId={section.id.toString()}/>
    </div>
  );
};
