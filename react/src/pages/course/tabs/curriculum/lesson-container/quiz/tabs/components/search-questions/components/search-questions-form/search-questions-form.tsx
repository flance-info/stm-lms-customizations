import { FC, useContext, useEffect } from 'react';
import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  VStack,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { SelectField, TextField } from '~/components/forms/fields';
import { FIELD_SPACING } from '~/common/constants';
import { QuestionsField } from '../questions-field';
import { SearchQuestionsFormFields } from '../search-questions-form-container/search-questions-form.interfaces';
import { useTranslate } from '~/services';
import { SearchContext } from '../../search-questions-context';
import {
  getCategories
} from '../../../../questions/components/questions-categories-field/questions-categories-field-hooks';

export const SearchQuestionsForm: FC = () => {
  const { watch, handleSubmit } = useFormContext<SearchQuestionsFormFields>();
  const { selected } = watch();
  const { addQuestions, isLoading, isDisabled, onUnDisable } = useContext(SearchContext);
  const { __, _n, sprintf } = useTranslate();

  useEffect(() => {
    return onUnDisable();
  }, []);

  const submitHandler = (data: SearchQuestionsFormFields) => {
    addQuestions(data.selected);
  };

  const { query: { data } } = getCategories();
  return (
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>{__('Questions Library (search)')}</DrawerHeader>
      <DrawerBody pos={'relative'}>
        <VStack spacing={FIELD_SPACING} align='stretch'>
          <SelectField
            name="categories"
            isClearable
            options={data.categories}
            optionLabel="name"
            placeholder={__('Select Category')}
          />
          <TextField name={'search'} placeholder={__('Search questions')} />
          <QuestionsField />
        </VStack>
      </DrawerBody>
      <DrawerFooter>
        <Button
          variant={'primary'}
          w={'100%'}
          onClick={handleSubmit(submitHandler)}
          isLoading={isLoading}
          disabled={isDisabled || selected.length === 0}
        >
          {
            selected.length === 0
              ? __('Add questions')
              : sprintf(__('Add %s %s'),
                selected.length,
                _n(__('question'), __('questions'), selected.length,
                ),
              )
          }
        </Button>
      </DrawerFooter>
    </DrawerContent>
  );
};
