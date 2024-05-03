import { FC, useContext } from 'react';
import { Button, chakra, Grid, GridItem } from '@chakra-ui/react';

import { FieldControl } from '~/components/forms/field-control';
import { NumberField, TextField } from '~/components/forms/fields';
import { QuestionsCategoriesField } from '../../../../questions-categories-field/questions-categories-field';
import { QuizQuestionContext } from '../../quiz-question/quiz-question-context';
import { useTranslate } from '~/services';

const FormGrid = chakra(Grid, {
  baseStyle: {
    gridTemplateColumns: '1fr 1fr 0.5fr',
    gridTemplateRows: 'repeat(2, 1fr)',
    gap: '20px',
    alignItems: 'end',
  },
});

export const QuizBankForm: FC = () => {
  const { __ } = useTranslate();
  const { onSaveClick } = useContext(QuizQuestionContext);

  return (
    <FormGrid>
      <GridItem gridColumn="1 / 2" gridRow="1 / 2">
        <TextField name={'answers.0.text'} label={__('Bank name')} placeholder={__('Enter bank name')} />
      </GridItem>
      <GridItem gridColumn="2 / 3" gridRow="1 / 2">
        <NumberField
          name={'answers.0.number'}
          label={__('Select number of questions')}
          decimalScale={0}
          allowNegative={false}
          withButtons
        />
      </GridItem>
      <GridItem gridColumn="3 / 4" gridRow="1 / 2"/>
      <GridItem gridColumn="1 / 3" gridRow="2 / 3">
        <FieldControl label={__('Select categories')} name={'categories'}>
          <QuestionsCategoriesField
            name={'categories'}
            isAllowedCreateCategory={false}
            placeholder={__('Select categories')}
          />
        </FieldControl>
      </GridItem>
      <GridItem gridColumn="3 / 4" gridRow="2 / 3">
        <Button
          variant={'green'}
          m={0}
          w={'100%'}
          onClick={onSaveClick}
        >
          {__('Save Question Bank')}
        </Button>
      </GridItem>
    </FormGrid>
  );
};
