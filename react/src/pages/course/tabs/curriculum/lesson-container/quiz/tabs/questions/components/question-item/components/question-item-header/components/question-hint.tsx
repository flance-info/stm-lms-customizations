import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { useWatch } from 'react-hook-form';
import { useQuestionHintI18n } from './question-hint-i18n';

export const QuestionHint: FC = () => {
  const type = useWatch({ name: 'type' });
  const hint = useQuestionHintI18n(type);
  return (
    <Box>{hint}</Box>
  );
};
