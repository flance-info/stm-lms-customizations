import { FC } from 'react';
import { BoxProps, Icon } from '@chakra-ui/react';

import { ReactComponent as DragIcon } from '~/assets/icons/drag.svg';
import { DragHandle } from './question-item-header/question-item-header-styles';

export const QuestionItemDragHandle: FC<BoxProps> = (props) => (
  <DragHandle {...props}>
    <Icon as={DragIcon} />
  </DragHandle>
);
