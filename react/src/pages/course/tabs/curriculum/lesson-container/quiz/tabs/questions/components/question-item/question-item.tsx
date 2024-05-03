import { FC, memo, useState } from 'react';
import { Box, chakra } from '@chakra-ui/react';
import { useWatch } from 'react-hook-form';

import { ButtonBar } from '../button-bar';
import { QuestionItemProps } from './question-item-interfaces';
import { usePrefix } from '~/helpers/form';
import { useSortableItem } from '~/components/drag-drop/DragDropItem';
import { QuizQuestion } from './components/quiz-question';
import { CornerMenu } from './components/corner-menu';
import { EQuestionType } from '../../questions-interfaces';

const QuestionItemFlex = chakra(Box, {
  baseStyle: {
    position: 'relative',
    bg: 'mainBackground',
    borderWidth: '1px',
    borderStyle: 'linear',
    borderRadius: 'sm',
    mt: '8px',
  },
});

export const QuestionItem: FC<QuestionItemProps> = memo((props) => {
  const { onRemoveClick, onAddBankClick, onAddQuestionClick, quizId, newFieldIndex, index } = props;
  const [showButtonBar, setShowButtonBar] = useState<boolean>(false);
  const withPrefix = usePrefix();
  const type = useWatch({ name: withPrefix('type') });
  const is_bank = type === EQuestionType.QUESTION_BANK;
  const {
    attributes,
    setNodeRef,
    style,
  } = useSortableItem();

  const containerStyles = {
    borderColor: 'border',
    ...( is_bank ? {
      bg: '#EBFFF9',
      borderColor: '#19C895',
    } : {}),
  };

  return (
    <>
      {showButtonBar &&
        <ButtonBar
          onAddQuestionClick={onAddQuestionClick}
          onAddBankClick={onAddBankClick}
          onCloseClick={() => setShowButtonBar(false)}
        />
      }
      <QuestionItemFlex
        alignItems={'center'}
        role={'group'}
        sx={containerStyles}
        ref={setNodeRef} style={style} {...attributes}
      >
        <Box position={'relative'}>
          <QuizQuestion key={type} quizId={quizId} newFieldIndex={newFieldIndex} index={index}/>
          <CornerMenu
            onRemoveClick={onRemoveClick}
            onAddClick={() => setShowButtonBar(true)}
            variant={is_bank ? 'green' : 'primary'}
          />
        </Box>
      </QuestionItemFlex>
    </>
  );
});

