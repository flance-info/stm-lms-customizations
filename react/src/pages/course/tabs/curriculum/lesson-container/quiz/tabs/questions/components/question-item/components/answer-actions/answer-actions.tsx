import React, { FC } from 'react';
import { Box, chakra, HStack } from '@chakra-ui/react';
import { ExplanationField } from '../explanation-field';
import { SmallActionButton } from '../../question-item-styles';
import { ActionIcon } from '../question-item-header/question-item-header-styles';
import { usePrefix } from '~/helpers/form';
import { useTranslate } from '~/services';
import { ReactComponent as TrashIcon } from 'assets/icons/trash.svg';

interface AnswerActionsProps {
  removeClickHandler: () => void;
  alwaysVisible?: boolean;
}

const AnswerActionsContainer = chakra(HStack, {
  baseStyle: {
    zIndex: 10,
    opacity: 0,
    position: 'relative',
    transition: 'all 0.3s linear',
    pointerEvents: 'none',
    '[role=answer]:hover &': {
      opacity: 1,
      pointerEvents: 'auto',
    },
  }
});

export const AnswerActions: FC<AnswerActionsProps> = ({ removeClickHandler, alwaysVisible = false }) => {
  const withPrefix = usePrefix();
  const { __ } = useTranslate();

  const Container = alwaysVisible ? HStack : AnswerActionsContainer;

  return <Container spacing={'10px'}>
    <Box>
      <ExplanationField name={withPrefix('explain')} />
    </Box>
    <Box>
      <SmallActionButton
        aria-label={__('Delete')}
        variant={'opaque'}
        size={'sm'}
        icon={<ActionIcon as={TrashIcon} boxSize={'16px'} />}
        onClick={removeClickHandler}
      />
    </Box>
  </Container>;
};
