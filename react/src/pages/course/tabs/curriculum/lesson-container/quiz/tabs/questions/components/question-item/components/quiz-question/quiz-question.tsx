import { FC, useCallback, useMemo } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import { debounceAsync } from '~/helpers/async';
import { hookFormResolver } from '../../../../../../forms/resolver';
import { questionsSchema } from '../../../../../../forms/schema';
import { QuizQuestionContent } from './quiz-question-content';
import { QuizQuestionContext } from './quiz-question-context';
import { usePrefix } from '~/helpers/form';
import { useSaveQuestion, useSaveQuestionBank } from './quiz-question-hooks';

interface QuizQuestionProps {
  quizId: number;
  newFieldIndex: number;
  index: number;
}

export const QuizQuestion: FC<QuizQuestionProps> = ({ quizId, newFieldIndex, index }) => {
  const withPrefix = usePrefix();
  const quizQuestion = useWatch({ name: withPrefix() });
  const formProps = useForm<any>({
    defaultValues: quizQuestion,
    mode: 'onTouched',
    // TODO: fix typing
    // @ts-ignore
    resolver: hookFormResolver(questionsSchema),
  });
  const { formState: { isValid }, watch } = formProps;

  const saveQuestionBank = useSaveQuestionBank(formProps);
  const saveQuestion = useSaveQuestion(quizId, formProps);

  const debounced = useMemo(() => {
    return debounceAsync(() => {
      return formProps.handleSubmit(saveQuestion)();
    }, 500);
  }, []);

  const watchCallback = useCallback(() => {
    if (isValid) {
      debounced();
    }
  }, [isValid]);

  watch(watchCallback);
  if (!quizQuestion) return null;

  return (
    <FormProvider {...formProps}>
      <QuizQuestionContext.Provider value={{ onSaveClick: formProps.handleSubmit(saveQuestionBank) }}>
        <QuizQuestionContent newFieldIndex={newFieldIndex} index={index}/>
      </QuizQuestionContext.Provider>
    </FormProvider>
  );
};
