import { InputProps } from '@chakra-ui/react';
import { ELessonType, Exams } from '~/models';

export interface TitleFieldProps extends InputProps {
  name: string;
  prefixType: ELessonType | Exams;
}
