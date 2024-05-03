import { FC } from 'react';
import { Box, chakra, Flex, useBreakpointValue } from '@chakra-ui/react';

import { AnswerActions } from '../../../components/answer-actions';
import { ItemMatchColumn, ItemMatchSubtitle } from '../../../question-item-styles';
import { MatchEditableField } from './match-editable-field';
import { usePrefix } from '~/helpers/form';
import { useTranslate } from '~/services';

interface ItemMatchAnswerProps {
  removeClickHandler: () => void;
}

const ItemMatchRow = chakra(Flex, {
  baseStyle: {
    alignItems: 'stretch',
    mb: '4px',
  },
});

const ItemMatchInput = chakra(Flex, {
  baseStyle: {
    alignItems: 'center',
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

export const ItemMatchAnswer: FC<ItemMatchAnswerProps> = (props) => {
  const { removeClickHandler } = props;
  const { __ } = useTranslate();
  const withPrefix = usePrefix();
  const isActionsVisible = useBreakpointValue({
    base: true,
    md: false,
  });
  const name = withPrefix('question');

  return (
    <ItemMatchRow role={'answer'}>
      <ItemMatchColumn>
        <ItemMatchSubtitle>{__('Question')}</ItemMatchSubtitle>
        <ItemMatchInput>
          <MatchEditableField
            name={name}
            placeholder={__('Enter your question')}
            isPreviewClickable={true}
            submitOnBlur
          />
        </ItemMatchInput>
      </ItemMatchColumn>
      <ItemMatchColumn>
        <ItemMatchSubtitle>{__('Answer')}</ItemMatchSubtitle>
        <ItemMatchInput
          justifyContent={'space-between'}
          flexDirection={['column', 'row']}
          alignItems={['flex-start', 'center']}
        >
          <MatchEditableField
            name={withPrefix('text')}
            placeholder={__('Enter your answer')}
            isPreviewClickable={true}
            submitOnBlur
          />
          <Box ml={['0', '10px']}>
            <AnswerActions
              removeClickHandler={removeClickHandler}
              alwaysVisible={isActionsVisible}
            />
          </Box>
        </ItemMatchInput>
      </ItemMatchColumn>
    </ItemMatchRow>
  );
};
