import { FC } from 'react';
import { Box, chakra, Checkbox, Flex, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { Category } from '~/models';
import { SearchQuestionsFormFields } from '../search-questions-form-container/search-questions-form.interfaces';
import { TypedQuestionModelWithCategories } from '../../../../questions/questions-interfaces';

const Container = chakra(Flex, {
  baseStyle: {
    w: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    bg: 'white',
    borderRadius: 'md',
    py: '9px',
    px: '16px',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.07)',
  }
});

interface LibraryQuestionItemProps {
  question: TypedQuestionModelWithCategories;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}

export const LibraryQuestionItem: FC<LibraryQuestionItemProps> = ({ question, onChange }) => {
  const { watch } = useFormContext<SearchQuestionsFormFields>();
  const { selected } = watch();
  const id = question.id.toString();

  return (
    <Container>
      <Box>
        <Text fontSize={'14px'}>{question.question}</Text>
        <Text fontSize={'12px'} color={'dark50'}>
          {question.categories.map(category => (category as unknown as Category).name).join(', ')}
        </Text>
      </Box>
      <Checkbox
        isChecked={selected.includes(id)}
        onChange={(event) => onChange(event, id)}
      />
    </Container>
  );
};
