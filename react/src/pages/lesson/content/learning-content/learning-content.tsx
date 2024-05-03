import { FC } from 'react';
import { Flex, Text } from '@chakra-ui/react';

import { ContentProps } from '../content-interfaces';
import { LessonCard } from '~/components/lessons-modal/lesson-card';
import { useTranslate } from '~/services';

type LearningContentProps = Omit<ContentProps, 'exams'>;

export const LearningContent: FC<LearningContentProps> = ({ lessons }) => {
  const { __ } = useTranslate();
  return (
    <>
      <Text fontSize="xs" color="dark70" mb="10px" fontWeight="bold">
        {__('LEARNING CONTENT')}
      </Text>
      <Flex gap="20px" mb="20px">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.type} lesson={lesson} />
        ))}
      </Flex>
    </>
  );
};