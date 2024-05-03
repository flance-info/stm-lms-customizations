import { FC } from 'react';
import { Flex, FlexProps, chakra, Icon } from '@chakra-ui/react';

import { ReactComponent as DragIcon } from '~/assets/icons/drag.svg';

export const Drag = chakra(Flex, {
  baseStyle: {
    p: '10px',
    color: 'dark20',
    cursor: 'grab',
    transition: 'all 0.25s linear',
    '&:hover': {
      color: 'dark50',
    },
  },
  shouldForwardProp() {
    return true;
  },
});

export const DragItem: FC<FlexProps> = (props) => (
  <Drag {...props}>
    <Icon as={DragIcon} />
  </Drag>
);
