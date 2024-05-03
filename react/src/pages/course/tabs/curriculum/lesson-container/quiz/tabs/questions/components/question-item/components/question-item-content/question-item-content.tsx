import { FC, memo } from 'react';

import { Container } from '../../question-item-styles';
import { EQuestionType } from '../../../../questions-interfaces';
import { QUESTION_FORM_BY_TYPE } from '../../questions-constants';
import { useWatch } from 'react-hook-form';

interface QuestionItemContentProps {
  expanded: boolean;
}

export const QuestionItemContent: FC<QuestionItemContentProps> = memo((props) => {
  const { expanded } = props;
  const type = useWatch({ name: 'type' });
  const QuestionForm = QUESTION_FORM_BY_TYPE[type as EQuestionType];

  return <Container display={expanded ? 'block' : 'none'}>{type && <QuestionForm type={type} />}</Container>;
});
