import React, { FC } from 'react';
import { Box, chakra, Flex } from '@chakra-ui/react';
import { FlexProps } from '@chakra-ui/layout/dist/flex';
import { LESSON_CONTENT_WIDTH } from '~/common/constants';

const FieldGroupContainer = chakra(Flex, {
    baseStyle: {
      pt: '30px',
      mt: '20px',
      borderTop: '1px solid #DBE0E9',
      '&:first-of-type': {
        borderTop: 'none',
        pt: 0,
      }
    }
});

interface FieldGroupProps extends FlexProps {
  children: React.ReactNode;
  width?: 'fixed' | 'full';
}
export const FieldGroup: FC<FieldGroupProps> = (props) => {
  const { children, width = 'full', ...flexProps } = props;
    return (
      <FieldGroupContainer {...flexProps}>
        <Box width={width === 'fixed' ? LESSON_CONTENT_WIDTH : undefined}>{children}</Box>
      </FieldGroupContainer>
    );
};
