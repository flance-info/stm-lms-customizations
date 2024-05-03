import { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { Info } from '~/components/info/info';
import { TextareaField } from '~/components/forms/fields';
import { QuestionContentHeading } from '../../components/question-content-heading/question-content-heading';
import { QuestionItemFormProps } from '../../question-item-interfaces';
import { useHighlightPlaceholder } from '~/helpers/string';
import { useTranslate } from '~/services';

export const FillTheGapForm: FC<QuestionItemFormProps> = () => {
  const { __ } = useTranslate();

  const hintText = __('Deborah was angry at her son. Her son didn\'t |listen| to her.' +
    'Her son was 16 years old. Her son |thought| he knew everything.' +
    ' Her son |yelled| at Deborah.');
  const renderedString = useHighlightPlaceholder(hintText, /(\|.*?\|)/);

  return (
    <>
      <QuestionContentHeading title={__('Answers')} />
      <Flex minHeight="100px">
        <TextareaField name={'answers.0.text'} />
      </Flex>
      <Box
        sx={{
        '& b': {
          color: 'black',
        },
        '& mark': {
          color: 'black',
          background: 'none',
          fontWeight: '400',
        },
      }}>
        <Info>
          <b>{__('Example:')}</b>&nbsp;
          {renderedString}
        </Info>
      </Box>
    </>
  );
};
