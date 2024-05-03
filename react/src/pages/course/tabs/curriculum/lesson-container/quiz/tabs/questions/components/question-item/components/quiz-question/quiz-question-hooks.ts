import { useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query';

import { EQuestionType, QuizQuestionModel } from '../../../../questions-interfaces';
import { QuizModel } from '~/services/resources/quiz/quiz';
import { ServerError } from '~/models';
import { useApi, useTranslate } from '~/services';
import { useErrorToastOptions } from '~/common/hooks';
import { usePrefix } from '~/helpers/form/with-prefix-context';
import { useToast } from '~/components/toast';

type UseQuestionAsyncMutate = UseMutateAsyncFunction<QuizQuestionModel, unknown, QuizQuestionModel>;

const isQueryNeedsUpdate = (question: any, queryQuestion: any) => {
  return question.type !== queryQuestion.type
    || question?.view_type !== queryQuestion?.view_type
    || question?.image?.id !== queryQuestion?.image?.id;
};

const useApiCall = (formProps: ReturnType<typeof useFormContext>) => {
  const withPrefix = usePrefix();
  const { setValue } = useFormContext();
  const queryClient = useQueryClient();

  return async (question: QuizQuestionModel, mutateFunc: UseQuestionAsyncMutate, quizId?: number) => {
    try {
      const newQuestion = await mutateFunc(question);
      if (newQuestion.id) {
        const newValue = { ...question, ...newQuestion };
        setValue(withPrefix(), newValue, { shouldDirty: true });
        formProps.setValue('id', newQuestion.id);
      }

      if (question.type !== EQuestionType.QUESTION_BANK) {
        let updateQueryData = false;
        const data = queryClient.getQueryData(['quiz', quizId?.toString()]) as { quiz: QuizModel };
        const updatedQuestions = data.quiz.questions.map((q) => {
          if (q.id === question.id) {
            if (isQueryNeedsUpdate(question, q)) {
              updateQueryData = true;
            }

            return { ...question, answers: question.answers };
          }
          return q;
        });

        const updatedData = {
          ...data,
          quiz: {
            ...data.quiz,
            questions: updatedQuestions,
          },
        };

        if ( updateQueryData ) {
          queryClient.setQueryData(['quiz', quizId?.toString()], updatedData);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const useSaveQuestionBank = (formProps: ReturnType<typeof useFormContext>) => {
  const api = useApi();
  const toast = useToast();
  const { __ } = useTranslate();
  const apiCall = useApiCall(formProps);

  const saveBank = useMutation(async (bank: QuizQuestionModel) => {
    return api.quiz.questions.create(bank);
  }, {
    onError: (error: ServerError) => {
      const errorToastOptions = useErrorToastOptions(error, __('Failed to add question'));
      toast(errorToastOptions);
    },
  });

  return async (bank: QuizQuestionModel) => {
    if (bank.type !== EQuestionType.QUESTION_BANK) return;

    await apiCall(bank, saveBank.mutateAsync);
  };
};

export const useSaveQuestion = (quizId: number, formProps: ReturnType<typeof useFormContext>) => {
  const api = useApi();
  const toast = useToast();
  const { __ } = useTranslate();
  const apiCall = useApiCall(formProps);

  const saveQuestionViaAPI = useMemo(() => async (question: QuizQuestionModel) => {
    if (question.id) {
      return api.quiz.questions.update(question.id, question);
    } else {
      if (question.type === EQuestionType.QUESTION_BANK) {
        return Promise.resolve();
      }
      return api.quiz.questions.create(question);
    }
  }, [api]);

  const saveQuestion = useMutation(
    saveQuestionViaAPI,
    {
      onError: (error: ServerError) => {
        const errorToastOptions = useErrorToastOptions(error, __('Failed to add question'));
        toast(errorToastOptions);
      },
    });

  return useCallback(async (question: QuizQuestionModel) => {
    if (question.type === EQuestionType.QUESTION_BANK) return;
    // @ts-ignore
    await apiCall(question, saveQuestion.mutateAsync, quizId);
  }, [apiCall]);
};
