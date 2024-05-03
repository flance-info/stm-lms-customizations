import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SearchQuestionsForm } from '../search-questions-form';
import { SearchQuestionsFormFields } from './search-questions-form.interfaces';

export const SearchQuestionsFormContainer: FC = () => {
  const formProps = useForm<SearchQuestionsFormFields>({
    defaultValues: {
      categories: '',
      search: '',
      selected: [],
    }
  });

  return (
    <FormProvider {...formProps}>
      <SearchQuestionsForm />
    </FormProvider>
  );
};
