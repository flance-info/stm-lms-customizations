import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { QuizBankNew } from './quiz-bank-new';
import { QuizBankSaved } from './quiz-bank-saved';

export const QuizBank: FC = () => {
  const id = useWatch({ name: 'id' });
  const isNew = !id;

  return (
    isNew
      ? <QuizBankNew />
      : <QuizBankSaved />
  );
};
