import { CustomField } from '~/models';

interface Tab {
  id: string;
  title: string;
}

export interface LessonTabsProps {
  children: React.ReactNode;
  isNew?: boolean;
  tabs: Tab[];
  fields?: CustomField[];
  lessonType?: string;
}

export interface LessonTabTitleProps {
  tab: Tab;
}
