import { Children, FC, ReactNode } from 'react';
import { Flex, Text } from '@chakra-ui/react';

interface QuestionContentHeadingProps {
  children?: ReactNode;
  title: string;
}

export const QuestionContentHeading: FC<QuestionContentHeadingProps> = (props) => {
  const { children, title } = props;
  return (
    <Flex mb={'15px'}>
      <Text color={'dark50'} fontSize={'15px'}>
        {title}
      </Text>
      {Children.count(children) > 0 && <Flex ml={'auto'}>{children}</Flex>}
    </Flex>
  );
};
