import { Box, Flex, Input } from '@chakra-ui/react';
import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { useFieldArray } from 'react-hook-form';

import { useTranslate } from '~/services';
import { WithFieldsPrefix } from '~/helpers/form/with-prefix-context';
import { QuestionItemFormProps } from '../../question-item-interfaces';
import { QuestionContentHeading } from '../../components/question-content-heading/question-content-heading';
import { Keyword } from './components/keyword';
import { EnterButton } from '../../question-item-styles';
import { useCustomRemove } from '~/helpers/react-hook-form';

export const KeywordsForm: FC<QuestionItemFormProps> = () => {
  const { __ } = useTranslate();

  const fieldName = 'answers';
  const { fields, append, replace } = useFieldArray({
    name: fieldName,
  });
  const remove = useCustomRemove(replace, fieldName);

  const [newAnswer, setNewAnswer] = useState<string>('');

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewAnswer(e.currentTarget.value);
  };

  const addNewAnswer = () => {
    if (newAnswer === '') return;

    append({
      text: newAnswer,
    });

    setNewAnswer('');
  };

  const inputPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
      addNewAnswer();
    }
  };

  const enterClickHandler = () => {
    addNewAnswer();
  };

  return (
    <Flex direction={'column'}>
      <QuestionContentHeading title={__('Keywords')} />
      {fields.map((field, index) => (
        <WithFieldsPrefix prefix={`answers.${index}`} key={field.id}>
          <Keyword removeClickHandler={() => {
            remove(index);
          }} key={field.id} />
        </WithFieldsPrefix>
      ))}
      <Box pos={'relative'} w={'100%'} mt={'10px'}>
        <Input
          variant="msVariant"
          value={newAnswer}
          onChange={inputChangeHandler}
          onKeyPress={inputPressHandler}
          placeholder={__('Add new answer')}
        />
        <EnterButton
          disabled={newAnswer === ''}
          onClick={enterClickHandler}
        >
          {__('Add')}
        </EnterButton>
      </Box>
    </Flex>
  );
};
