import { FC } from 'react';
import { chakra, Flex, FlexProps, Icon } from '@chakra-ui/react';

import { ReactComponent as TrashIcon } from '~/assets/icons/trash.svg';

export const Wrapper = chakra(Flex, {
  baseStyle: {
    alignItems: 'center',
    padding: '2px 0',
    color: 'dark50',
    cursor: 'pointer',
    transition: 'all 0.25s linear',
    '&:hover': {
      color: 'error',
    },
  },
  shouldForwardProp() {
    return true;
  },
});

export const DeleteButton: FC<FlexProps> = (props) => (
  <Wrapper {...props}>
    <Icon as={TrashIcon} />
  </Wrapper>
);
