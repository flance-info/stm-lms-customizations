import { ElementType, FC, ReactNode } from 'react';
import {
  Box,
  chakra,
  Flex,
  Heading,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';
import { FlexProps } from '@chakra-ui/layout/dist/flex';

interface FieldSuffixProps extends FlexProps {
  label?: string;
  icon?: ElementType;
  hint?: ReactNode;
}

const Container = chakra(Flex, {
  baseStyle: {
    alignItems: 'center',
    color: 'primary',
    bg: 'rgba(34, 122, 255, 0.1)',
    borderRadius: '0 4px 4px 0',
    p: '6px',
    maxHeight: '30px',
  },
});

export const FieldSuffix: FC<FieldSuffixProps> = (props) => {
  const { icon, label, children, hint, ...flexProps } = props;
  return (
    <Flex {...flexProps} alignItems={'stretch'} cursor={'pointer'}>
      <Flex>{children}</Flex>
      <Popover placement={'top'} computePositionOnMount>
        <PopoverTrigger>
          <Container>
            <Icon as={icon} />
            {label}
          </Container>
        </PopoverTrigger>
        <Portal>
          <Box zIndex={30} pos={'relative'}>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              {label &&
                <PopoverHeader>
                  <Heading size={'sm'}>{label}</Heading>
                </PopoverHeader>
              }
              {hint && <PopoverBody color={'secondary'}>{hint}</PopoverBody>}
            </PopoverContent>
          </Box>
        </Portal>
      </Popover>
    </Flex>
  );
};
