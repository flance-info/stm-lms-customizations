import React, { FC, memo } from 'react';
import { Box, chakra, Checkbox, Flex, HStack, Radio, Text } from '@chakra-ui/react';

import { AnswerActions } from '../../../../components/answer-actions';
import { MatchEditableField } from '../../../item-match-form/components/match-editable-field';
import { OptionProps } from './option-interfaces';
import { QuestionItemDragHandle } from '../../../../components/question-item-drag-handle';
import { useDragDropItem } from '~/components/drag-drop/DragDropItem';
import { usePrefix } from '~/helpers/form';
import { useSortable } from '@dnd-kit/sortable';
import { useTranslate } from '~/services';

const OptionHeaderContainer = chakra(Flex, {
  baseStyle: {
    alignItems: 'center',
    w: '100%',
    '& .chakra-form__error-message': {
      position: 'absolute',
      left: 'calc(100% - 120px)',
      top: '50%',
      transform: 'translateY(-50%)',
      whiteSpace: 'nowrap',
      m: 0,
    },
  },
});

const RadioCheckboxLabel = chakra('label', {
  baseStyle: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
});

export const OptionHeader: FC<OptionProps> = memo((props) => {
  const { index, removeClickHandler, multiple, isText = false } = props;
  const { id } = useDragDropItem();
  const { listeners } = useSortable({ id });
  const withPrefix = usePrefix();
  const { __ } = useTranslate();

  const RadioCheckbox = multiple ? Checkbox : Radio;
  const Actions = <AnswerActions removeClickHandler={removeClickHandler} />;

  return (
    <>
      <OptionHeaderContainer>
        <QuestionItemDragHandle {...listeners} />
        <MatchEditableField
          isPreviewClickable={true}
          submitOnBlur={true}
          name={withPrefix('text')}
          placeholder={__('Enter your answer')}
        />
        <HStack ml={'10px'} spacing={'10px'}>
          {isText && Actions}
          <Box>
            <RadioCheckboxLabel>
              <Text variant={'span'} mr={'5px'}>{__('Correct')}</Text>
              <RadioCheckbox value={index.toString()} variant={'msVariant'} />
            </RadioCheckboxLabel>
          </Box>
        </HStack>
      </OptionHeaderContainer>
    </>
  );
});

OptionHeader.whyDidYouRender = true;
