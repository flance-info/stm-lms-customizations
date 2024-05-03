import { FC } from 'react';
import { useFieldArray } from 'react-hook-form';
import { Flex } from '@chakra-ui/react';
import { WithFieldsPrefix } from '~/helpers/form/with-prefix-context';
import { useTranslate } from '~/services';
import { QuestionItemFormProps } from '../../question-item-interfaces';
import { QuestionContentHeading } from '../../components/question-content-heading/question-content-heading';
import { ItemMatchAnswer } from './components/item-match-answer';
import { AddItemButton } from '../../../add-item-button/add-item-button';

export const ItemMatchForm: FC<QuestionItemFormProps> = () => {
  const { __ } = useTranslate();
  const { fields, append, remove } = useFieldArray({
    name: 'answers',
  });

  const addNewAnswer = () => {
    append({
      question: '',
      answer: '',
      question_image: null,
      text_image: null,
    });
  };

  return (
    <Flex direction={'column'}>
      <QuestionContentHeading title={__('Questions & Answers')} />
      {fields.map((field, index) => (
        <WithFieldsPrefix prefix={`answers.${index}`} key={`${field.id}-${index}`}>
          <ItemMatchAnswer removeClickHandler={() => remove(index)} />
        </WithFieldsPrefix>
      ))}
      <AddItemButton onClick={addNewAnswer} w={'100%'} minHeight={'20px'} />
    </Flex>
  );
};
