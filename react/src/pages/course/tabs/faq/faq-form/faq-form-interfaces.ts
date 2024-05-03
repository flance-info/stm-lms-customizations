import { FaqItem } from '~/models';

export interface FaqFormValues {
  faq: FaqItem[];
}

export interface FaqFormProps {
  initialData: FaqFormValues;
  courseId: string;
}
