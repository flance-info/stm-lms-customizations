import { FC } from 'react';
import { chakra, Flex, Icon, Text } from '@chakra-ui/react';

import { GoBackButtonProps } from './go-back-button-interfaces';
import { getButtonStyles } from './go-back-button-utils';

import { ReactComponent as ArrowBack } from '~/assets/icons/arrow-back.svg';

const ButtonWrapper = chakra(Flex, {
  baseStyle: {
    alignItems: 'center',
    gap: '10px',
    padding: '10px 20px',
    cursor: 'pointer',
    height: '100%',
    borderRadius: '4px',
  },
});

export const GoBackButton: FC<GoBackButtonProps> = ({ type, label, onClick }) => {
  const styles = getButtonStyles(type);

  return (
    <ButtonWrapper {...styles} onClick={onClick}>
      <Icon as={ArrowBack}/>
      <Text fontSize="xs" lineHeight="xs">{label}</Text>
    </ButtonWrapper>
  );
};