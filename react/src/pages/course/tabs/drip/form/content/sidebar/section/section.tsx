import { FC, ReactNode } from 'react';
import { AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';
import { CSS } from '@dnd-kit/utilities';
import { useDraggable, useDroppable } from '@dnd-kit/core';

import { Material } from './material';
import { Material as MaterialModel } from '~/models';
import { SectionProps } from './section-interfaces';
import { SectionTitle } from './section-title';

const Draggable: FC<{ material: MaterialModel, children: ReactNode }> = ({ material, children }) => {
  const { attributes, setNodeRef, transform } = useDraggable({
    id: material.id,
    data: material,
  });

  return (
    <Box transform={CSS.Translate.toString(transform)} {...attributes} ref={setNodeRef}>
      {children}
    </Box>
  );
};

export const Section: FC<SectionProps> = ({ section, materials }) => {
  const { setNodeRef } = useDroppable({ id: section.id });

  return (
    <AccordionItem>
      {({ isExpanded }) => (
        <>
          <SectionTitle title={section.title} isExpanded={isExpanded}/>
          <AccordionPanel>
            <div ref={setNodeRef}>
              {materials.map((material) => (
                <Draggable key={material.id} material={material}>
                  <Material material={material}/>
                </Draggable>
              ))}
            </div>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};
