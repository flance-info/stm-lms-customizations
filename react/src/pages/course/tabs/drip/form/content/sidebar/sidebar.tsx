import { FC } from 'react';
import { Accordion, Flex } from '@chakra-ui/react';

import { Section as SectionComponent } from './section';
import { SidebarProps } from './sidebar-interfaces';
import { SidebarWrapper } from '~/components/sidebar-wrapper';
import { useTranslate } from '~/services';
import { Section, Material } from '~/models';

export const Sidebar: FC<SidebarProps> = ({ sections, materials }) => {
  const { __ } = useTranslate();

  const getSectionMaterials = (section: Section, materials: Material[]) =>
    materials.filter(material => material.section_id === section.id);

  return (
    <SidebarWrapper
      title={__('Course materials')}
      text={__('Drag lessons, quizzes and assignments to the right to create drip content')}
    >
      <Flex flexDirection="column">
        <Accordion variant="msVariant" allowMultiple defaultIndex={sections.map((s, index) => index)}>
          {sections.map(section => (
            <SectionComponent key={section.id} section={section} materials={getSectionMaterials(section, materials)}/>
          ))}
        </Accordion>
      </Flex>
    </SidebarWrapper>
  );
};
