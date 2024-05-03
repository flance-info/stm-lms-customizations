import { FC, memo } from 'react';
import { chakra, Icon, IconProps } from '@chakra-ui/react';

import { ReactComponent as AccordionArrow } from '~/assets/icons/accordion-arrow.svg';

interface AccordionIconProps extends IconProps {
  isOpen: boolean;
}

const ActionIcon = chakra(Icon, {
  baseStyle: {
    transition: 'all 0.25s linear',
    cursor: 'pointer',
  },
});

export const AccordionIcon: FC<AccordionIconProps> = memo(({ isOpen, ...iconProps }) => (
  <ActionIcon
    {...iconProps}
    as={AccordionArrow}
    transform={isOpen ? 'rotate(180deg)' : undefined}
  />
));
