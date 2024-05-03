import { FC, memo, useState } from 'react';
import { Button, Drawer, DrawerOverlay, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useMutation } from 'react-query';

import { QuizQuestionModel } from '../../questions/questions-interfaces';
import { SearchContext } from './search-questions-context';
import { SearchQuestionsFormContainer } from './components/search-questions-form-container';
import { ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useErrorToastOptions, useInvalidate } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const SearchQuestions: FC = memo(() => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { __ } = useTranslate();
  const api = useApi();
  const { watch } = useFormContext();
  const id = watch('id', undefined);
  const toast = useToast();
  const invalidate = useInvalidate(['quiz', id.toString()]);
  const questions = watch('questions', undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isTablet] = useMediaQuery('(min-width: 768px) and (max-width: 1230px)');

  const { mutateAsync, isLoading } = useMutation((newQuestions: string[]) => {
    return api.quiz.updateQuestions(id, newQuestions);
  }, {
    onSuccess: () => {
      setIsDisabled(true);
      invalidate();
      setTimeout(() => {
        onClose();
        toast({ message: __('Questions successfully added'), type: TOAST_STATUS.SUCCESS });
      }, 500);
    },
    onError: (error: ServerError) => {
      const errorToastOptions = useErrorToastOptions(error, __('Failed to add questions'));
      toast(errorToastOptions);
    },
  });

  const addQuestions = async (selectedQuestions: string[]) => {
    await mutateAsync([...questions.map(
      (question: QuizQuestionModel) => question.id
    ), ...selectedQuestions]);
  };

  return (
    <SearchContext.Provider value={{ addQuestions, isLoading, isDisabled, onUnDisable: () => setIsDisabled(false) }}>
      <Button
        variant={'outline'}
        m={0}
        onClick={onOpen}
        p={isTablet ? '5px' : '11px 20px'}
      >
        {__('Questions library')}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      >
        <DrawerOverlay />
        <SearchQuestionsFormContainer/>
      </Drawer>
    </SearchContext.Provider>
  );
});
