import { FC, Fragment } from 'react';
import { Box, chakra, Flex, Grid, GridItem, Text } from '@chakra-ui/react';

import { Info } from '~/components/info/info';
import { QuestionCategory } from '~/models';
import { useGetFieldValue } from '~/common/hooks';
import { useTranslate } from '~/services';
import { getCategories } from '../../../questions-categories-field/questions-categories-field-hooks';

const ContainerGrid = chakra(Grid, {
  baseStyle: {
    gridTemplateRows: 'repeat(2, 1fr)',
    gap: '10px',
  }
});

const Subtitle = chakra(Text, {
  baseStyle: {
    fontSize: 'xs',
    color: 'green',
    fontWeight: 'bold',
    width: 'fit-content',
  }
});

const Title = chakra(Text, {
  baseStyle: {
    fontSize: 'md',
    fontWeight: 'medium',
  },
});

const QuestionsTag = chakra(Box, {
  baseStyle: {
    background: 'rgba(25, 200, 149, 1)',
    borderRadius: '4px',
    padding: '2px 5px 3px 5px',
    color: 'white',
    fontSize: 'xxs',
    fontWeight: 'bold',
    width: 'fit-content',
  },
});

export const QuizBankSaved: FC = () => {
  const { __, _n } = useTranslate();
  const meta = useGetFieldValue('answers.0');
  let categories: string[] = [];

  if ( meta.categories ) {
    categories = meta.categories.map((category: QuestionCategory) => category.name);
  } else {
    const metaCategories = useGetFieldValue('categories');
    const { query: { data } } = getCategories();

    categories = metaCategories && data?.categories
      ? metaCategories.map((categoryId: any) => {
        const matchingCategory = data?.categories.find((category: QuestionCategory) => category.term_id === categoryId);
        return matchingCategory ? matchingCategory.name : null;
      })
      : [];
  }

  return (
    <ContainerGrid alignItems={'center'}>
      <Grid gridTemplateRows="0.5fr" gridTemplateColumns="repeat(2, 1fr)">
        <GridItem>
          <Flex gap="5px">
            <Subtitle>{__('Questions Bank')}</Subtitle>
            <QuestionsTag>{meta.number} {_n('question', 'questions', meta.number)}</QuestionsTag>
          </Flex>
          <Title>{meta.text}</Title>
        </GridItem>
        <GridItem alignSelf="center">
          <Flex maxWidth="500px" flexWrap="wrap" gap="5px">
            <Text fontSize="sm" fontWeight="medium" color="dark70">{__('Category')}{':'}</Text>
            <Text
              fontSize="sm"
              fontWeight="medium"
              color="dark"
            >
              {categories.map((category: string, idx: number) => (
                <Fragment key={idx}>
                  {` ${category}${categories.length - 1 !== idx ? ',' : ''} `}
                </Fragment>
              ))}
            </Text>
          </Flex>
        </GridItem>
      </Grid>
      <GridItem pt="10px" borderTop="1px solid" borderColor="border">
        <Info variant={'green'} fontSize={'14px'}>
          {__('The Question Bank cannot be edited. You can delete it or create a new one.')}
        </Info>
      </GridItem>
    </ContainerGrid>
  );
};
