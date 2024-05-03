import { FC, useCallback, useEffect, useState } from 'react';
import { QuestionItemHeader } from '../question-item-header';
import { QuestionItemContent } from '../question-item-content';
import { useWatch } from 'react-hook-form';
import { EQuestionType } from '../../../../questions-interfaces';

interface QuizQuestionContentProps {
  newFieldIndex: number;
  index: number;
}

export const QuizQuestionContent: FC<QuizQuestionContentProps> = ({ newFieldIndex, index }) => {
  const type = useWatch({ name: 'type' });
  const is_bank = type === EQuestionType.QUESTION_BANK;
  const [expanded, setExpanded] = useState<boolean>(type !== null);

  useEffect(() => {
    setExpanded(type !== null);
  }, [type]);

  const expandClickHandler = useCallback(() => {
    setExpanded(state => !state);
  }, []);

    return (
      <>
        {!is_bank &&
          <QuestionItemHeader
            newFieldIndex={newFieldIndex}
            expanded={expanded}
            onExpandClick={expandClickHandler}
            index={index}
          />
        }
        <QuestionItemContent expanded={expanded} />
      </>
    );
};
