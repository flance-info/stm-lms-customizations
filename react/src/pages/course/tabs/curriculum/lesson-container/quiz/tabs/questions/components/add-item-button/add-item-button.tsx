import { FC } from 'react';
import { chakra, Flex, HStack, Icon } from '@chakra-ui/react';
import { ReactComponent as PlusCircleFilledIcon } from '~/assets/icons/plus-circle-filled.svg';
import { useTranslate } from '~/services';
import { FlexProps } from '@chakra-ui/layout/dist/flex';

const AddItemButtonContainer = chakra(Flex, {
  baseStyle: {
    color: 'primary',
    fontWeight: '700',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
  },
});

export const AddItemButton: FC<FlexProps> = ({ onClick, ...props }) => {
  const { __ } = useTranslate();
  return (
    <AddItemButtonContainer {...props}>
      <HStack spacing={'5px'} onClick={onClick} cursor={'pointer'}>
        <Icon as={PlusCircleFilledIcon} boxSize={'18px'} />
        <span>{__('Add new answer')}</span>
      </HStack>
    </AddItemButtonContainer>
  );
};
