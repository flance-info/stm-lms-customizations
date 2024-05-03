import { Section } from 'models';

export interface SectionTitleProps {
  section: Section;
}

export interface EditableControlsProps {
  isPreview?: boolean;
  hasTitle?: boolean;
}
