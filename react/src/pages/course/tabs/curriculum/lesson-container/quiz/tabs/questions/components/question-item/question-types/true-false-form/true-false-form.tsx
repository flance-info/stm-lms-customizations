import { FC, useCallback } from 'react';
import { Radio, RadioGroup } from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { QuestionItemFormProps } from '../../question-item-interfaces';
import { OptionContainer } from '../choice-question-type-form/components/choice-option/option-container';
import { useTranslate } from '~/services';
import { QuestionContentHeading } from '../../components/question-content-heading/question-content-heading';

export const TrueFalseForm: FC<QuestionItemFormProps> = () => {
  const { field, fieldState } = useController({ name: 'answers' });
  const { __ } = useTranslate();

  const valueChangeHandler = useCallback(
    (value: string) => {
      field.onChange([
        {
          text: __('True'),
          isTrue: value === '1' ? 1 : 0,
        },{
          text: __('False'),
          isTrue: value === '0' ? 1 : 0,
        },
      ]);
    },
    [field],
  );

  const value = field.value?.at(0)?.isTrue?.toString() === '1' ? '1' : '0';

  return (
    <>
      <QuestionContentHeading title={__('Answer')} />
      <RadioGroup onChange={valueChangeHandler} value={value}>
        <OptionContainer>
          <Radio value={'1'}>{__('True')}</Radio>
        </OptionContainer>
        <OptionContainer>
          <Radio value={'0'}>{__('False')}</Radio>
        </OptionContainer>
        {fieldState.error && <p>{fieldState.error.message}</p>}
      </RadioGroup>
    </>
  );
};
