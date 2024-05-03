import { FC, useCallback } from 'react';
import { OptionBox, SmallActionButton } from '../../../question-item-styles';
import { usePrefix } from '~/helpers/form/with-prefix-context';
import { useTranslate } from '~/services';
import { MatchEditableField } from '../../item-match-form/components/match-editable-field';
import { chakra, Flex } from '@chakra-ui/react';
import { ExplanationField } from '../../../components/explanation-field';
import { ActionIcon } from '../../../components/question-item-header/question-item-header-styles';

import { ReactComponent as TrashIcon } from 'assets/icons/trash.svg';

interface MatchEditableFieldProps {
  removeClickHandler: () => void;
}

const AnswerActionsContainer = chakra(Flex, {
  baseStyle: {
    opacity: 0,
    transition: 'all 0.3s linear',
    pointerEvents: 'none',
    '[role=answer]:hover &': {
      opacity: 1,
      pointerEvents: 'auto',
    },
  }
});

const KeywordWrapper = chakra(Flex, {
  baseStyle: {
    width: '100%',
    gap: '10px',
    alignItems: 'center',
    '& .chakra-form__error-message': {
      position: 'absolute',
      left: 'calc(100% - 120px)',
      top: '50%',
      transform: 'translateY(-50%)',
      whiteSpace: 'nowrap',
      m: 0,
    },
  }
});

export const Keyword: FC<MatchEditableFieldProps> = (props) => {
  const withPrefix = usePrefix();
  const { __ } = useTranslate();
  const removeClickHandler = useCallback(() => {
    props.removeClickHandler();
  }, [props.removeClickHandler]);

  return (
    <OptionBox mb={'10px'} minHeight={'52px'} role={'answer'}>
      <KeywordWrapper>
        <MatchEditableField
          name={withPrefix('text')}
          submitOnBlur
          placeholder={__('Enter your keyword')}
          isPreviewClickable={true}
        />
        <AnswerActionsContainer>
          <ExplanationField name={withPrefix('explain')} />
          <SmallActionButton
            aria-label={__('Delete')}
            variant={'opaque'}
            size={'sm'}
            icon={<ActionIcon as={TrashIcon} boxSize={'16px'} />}
            onClick={removeClickHandler}
          />
        </AnswerActionsContainer>
      </KeywordWrapper>
    </OptionBox>
  );
};
