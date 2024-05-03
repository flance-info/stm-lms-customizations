import { Box, chakra, Flex } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { FlexProps } from '@chakra-ui/layout/dist/flex';

const MaterialContainerFlex = chakra(Flex, {
  baseStyle: {
    alignItems: 'center',
    border: '1px solid transparent',
    borderRadius: 'sm',
    position: 'relative',
    '&:hover': {
      bg: 'mainBackground',
    },
  },
  shouldForwardProp: () => true,
});

interface MaterialContainerProps extends FlexProps {
  isSelected: boolean;
}

export const MaterialContainer = forwardRef<HTMLElement, MaterialContainerProps>(
  ({ isSelected, ...flexProps }, ref) => {
    return (
      <MaterialContainerFlex
        {...flexProps}
        ref={ref}
        role={'group'}
        borderColor={isSelected ? 'primary' : 'transparent'}
        background={isSelected ? 'mainBackground' : 'white'}
      />
    );
  });

export const SidebarActions = chakra(Box, {
  baseStyle: {
    transition: 'all 0.25s linear',
    opacity: 0,
    pointerEvents: 'none',
  },
});
