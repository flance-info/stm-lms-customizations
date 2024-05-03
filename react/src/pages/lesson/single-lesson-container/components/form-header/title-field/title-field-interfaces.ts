import { InputProps } from '@chakra-ui/react';

import { ELessonType, Exams } from '~/models';

export interface TitleFieldProps extends InputProps {
  prefixType: ELessonType | Exams;
  onOpenModal: () => void;
  isNew: boolean;
}
