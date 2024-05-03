import { FC } from 'react';
import { useTranslate } from '~/services';
import { QuizBankForm } from './quiz-bank-form';
import { Info } from '~/components/info/info';
import { chakra, Flex, Text } from '@chakra-ui/react';

const QuizBankHeader = chakra(Flex, {
  baseStyle: {
    width: '100%',
    position: 'relative',
    alignItems: 'center',
  },
});

export const QuizBankNew: FC = () => {
  const { __ } = useTranslate();

  return (
    <Flex flexDirection={'column'} gap={'20px'}>
      <QuizBankHeader>
        <Text fontSize={'16px'} color={'secondaryHover'}>{__('Questions Bank')}</Text>
      </QuizBankHeader>
      <Flex flexDirection={'column'} gap={'20px'}>
        <QuizBankForm />
        <Info variant={'green'}>
          {__('This type of question is not a question in itself.' +
            'A bank is just a group of questions from a certain category.' +
            'Questions from this category will be shown in a separate block,' +
            'with the group name you will write below.')}
        </Info>
      </Flex>
    </Flex>
  );
};
