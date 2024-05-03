import { FC } from 'react';
import { Box, Button, ButtonProps, chakra, Flex, Icon, Text } from '@chakra-ui/react';

import { ActionButton } from './components/question-item-header/question-item-header-styles';

import { ReactComponent as AddArrow } from '~/assets/icons/add-arrow.svg';

export const Container = chakra(Flex, {
  baseStyle: {
    w: '100%',
    padding: '20px',
  },
});

export const OptionBox = chakra(Flex, {
  baseStyle: {
    bg: 'white',
    borderRadius: 'sm',
    alignItems: 'center',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.07)',
    p: '10px',
  },
});
export const ItemMatchSubtitle = chakra(Text, {
  baseStyle: {
    fontSize: 'sm',
    color: 'dark50',
  },
});
export const ItemMatchColumn = chakra(Box, {
  baseStyle: {
    flex: '1 1 0',
    bg: 'white',
    borderRadius: 'sm',
    p: '10px 15px',
    position: 'relative',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.07)',
    '& > *': {
      position: 'relative',
      zIndex: 5,
    },
    '&:first-of-type': {
      mr: '2px',
      borderRadius: '4px 0 0 4px',
      zIndex: 2,
      '&::before': {
        content: '""',
        position: 'absolute',
        display: 'block',
        boxSize: '24px',
        bg: 'white',
        borderRadius: '12px',
        borderWidth: '4px',
        borderStyle: 'solid',
        borderColor: 'mainBackground',
        left: '100%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        display: 'block',
        boxSize: '24px',
        bg: 'white',
        right: '-12px',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
      },
    },
    '&:last-of-type': {
      ml: '2px',
      borderRadius: '0 4px 4px 0',
    },
  },
});
export const SmallActionButton = chakra(ActionButton, {
  baseStyle: {
    px: '3px',
    py: '3px',
    m: 0,
    ml: 0,
  },
});

const EnterButtonContainer = chakra(Button, {
  baseStyle: {
    boxSize: '32px',
    px: '3px',
    py: '3px',
    m: 0,
    position: 'absolute',
    right: '3px',
    top: '50%',
    transform: 'translateY(-50%)',
  },
});

export const EnterButton: FC<ButtonProps> = ({ children, ...restProps }) => (
  <EnterButtonContainer variant={'primary'} p="3px 4px" {...restProps}>
    <Flex flexDirection={'column'} gap={'1px'}>
      <Text fontSize={'10px'} lineHeight={'13px'}>{children}</Text>
      <Icon as={AddArrow} w={'20px'} h={'10px'}/>
    </Flex>
  </EnterButtonContainer>
);
