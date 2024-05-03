import { Section } from '~/models';
import { ReactNode } from 'react';

export interface SectionContainerProps {
  section: Section;
}

export interface SidebarSectionProps {
  section: Section;
  onRemoveClick: () => void;
  children: ReactNode;
}
