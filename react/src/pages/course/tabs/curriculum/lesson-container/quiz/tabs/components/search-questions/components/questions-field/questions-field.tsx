import { FC, useEffect } from 'react';
import { Flex, VStack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';

import { LibraryQuestionItem } from '../library-question-item';
import { Loader } from '~/components/loader';
import { SearchQuestionsFormFields } from '../search-questions-form-container/search-questions-form.interfaces';
import { TypedQuestionModelWithCategories } from '../../../../questions/questions-interfaces';
import { useApi, useTranslate } from '~/services';
import { useDebounce } from '~/common/hooks';

const QUESTION_POST_TYPE = 'stm-questions';

export const QuestionsField: FC = () => {
  const api = useApi();
  const { __ } = useTranslate();
  const { watch, setValue } = useFormContext<SearchQuestionsFormFields>();
  const { selected, categories, search } = watch();

  const debouncedCategory = useDebounce(categories, 500);
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } =
    useQuery(['questions', debouncedCategory, debouncedSearch], ({ queryKey }) => {
      const [, category, search] = queryKey;
      return api.wordpress.searchQuestions(QUESTION_POST_TYPE, category, search);
    });

  useEffect(() => {
    setValue('selected', [], { shouldDirty: true });
  }, [categories]);

  if (isLoading) {
    return <Loader isCenter />;
  }

  if (!data) {
    return null;
  }

  const onSetValue = (isChecked: boolean, id: string) => {
    if (isChecked) {
      const filteredQuestionsIds = selected.filter((questionId) => questionId !== id);
      setValue('selected', filteredQuestionsIds, { shouldDirty: true });
    } else {
      setValue('selected', [...selected, id], { shouldDirty: true });
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    return onSetValue(event.target.checked, id);
  };

  const onClick = (id: string) => {
    const isChecked = selected.includes(id);
    return onSetValue(isChecked, id);
  };

  return (
    <>
      {data.length ?
        data.map((question: TypedQuestionModelWithCategories) => (
          <VStack key={question.id} spacing={'20px'} onClick={() => onClick(question.id.toString())} cursor="pointer">
            <LibraryQuestionItem question={question} onChange={onChange}/>
          </VStack>
        ))
        : <Flex justify="center" p="20px 0">{__('Questions not found')}</Flex>
      }
    </>
  );
};
