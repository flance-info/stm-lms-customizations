import { Icon, MenuItem } from '@chakra-ui/react';
import { ReactComponent as PlusIcon } from '~/assets/icons/plus.svg';
import { useTranslate } from '~/services';
import { ButtonBarContainer, LineThroughButton } from './button-bar-styles';

import { useGetTypeOptions } from '../question-item/components/question-item-header/question-item-hooks';
import { HoverMenu } from './hover-menu';
import { ETypedQuestions } from '../../questions-interfaces';

interface ButtonBarProps {
  onAddQuestionClick: (type: ETypedQuestions) => void;
  onAddBankClick: () => void;
  onCloseClick?: () => void;
}

export const ButtonBar: React.FC<ButtonBarProps> = (props) => {
  const { onAddQuestionClick, onAddBankClick, onCloseClick } = props;
  const { __ } = useTranslate();
  const questionTypeOptions = useGetTypeOptions();

  return (
    <ButtonBarContainer>
      <HoverMenu label={__('Question')}>
        {questionTypeOptions.map((option) => (
          <MenuItem
            key={option.id}
            onClick={() => {
              onAddQuestionClick(option.id);
              if (onCloseClick) {
                onCloseClick();
              }
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </HoverMenu>
      <LineThroughButton
        size={'smallx'}
        leftIcon={<Icon as={PlusIcon} boxSize={'8px'} />}
        variant={'green'}
        sx={{ '.chakra-button__icon': { mr: '3px' } }}
        onClick={onAddBankClick}
      >
        {__('Question Bank')}
      </LineThroughButton>
    </ButtonBarContainer>
  );
};
ButtonBar.whyDidYouRender = true;

