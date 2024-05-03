import { FC } from 'react';
import { chakra, Grid, GridItem, useDisclosure } from '@chakra-ui/react';

import { Controls } from './controls';
import { ELessonType, Exams, PostType } from '~/models';
import { FormHeaderProps } from './form-header-interfaces';
import { getCourseBuilderSettings } from '~/common/hooks';
import { GoBackButton } from '~/components/go-back-button';
import { LessonsModal } from '~/components/lessons-modal';
import { TitleField } from './title-field';
import { useGetLessons } from '../../../lesson-hooks';
import { useTranslate } from '~/services';

const Header = chakra(Grid, {
  baseStyle: {
    gap: '20px',
    display: 'grid',
    background: 'headerBg',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 21,
    gridTemplateColumns: '130px 2fr 1fr',
    gridTemplateRows: '60px',
 },
});

export const FormHeader: FC<FormHeaderProps> = ({ type, placeholder, isLoading, isNew, isDisabled }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const lessons = useGetLessons();
  const { data } = getCourseBuilderSettings();
  const { __ } = useTranslate();
  const goBackHandler = () => {
    let post_type = PostType.STM_LESSONS;

    if (type === Exams.ASSIGNMENT) {
      post_type = PostType.STM_ASSIGNMENTS;
    }

    if (type === Exams.QUIZ) {
      post_type = PostType.STM_QUIZZES;
    }

    if (type === Exams.GOOGLE_MEET) {
      post_type = PostType.STM_GOOGLE_MEETS;
    }

    window.open(data?.urls.dashboard_posts + post_type, '_self');
  };

  const getLabelByType = (type: Exams | ELessonType) => {
    switch (type) {
      case Exams.ASSIGNMENT:
        return __('Back to assignments');
      case Exams.GOOGLE_MEET:
        return __('Back to google meets');
      case Exams.QUIZ:
        return __('Back to quizzes');
      default:
        return __('Back to lessons');
    }
  };

  const label = getLabelByType(type);

  return (
    <Header as="header">
      <GridItem>
        <GoBackButton type="edit" onClick={goBackHandler} label={label}/>
      </GridItem>
      <GridItem alignSelf="center">
        <TitleField
          prefixType={type}
          placeholder={placeholder}
          onOpenModal={onOpen}
          isNew={isNew}
        />
        <LessonsModal lessons={lessons} onClose={onClose} isOpen={isOpen}/>
      </GridItem>
      <GridItem justifySelf="end" alignSelf="center">
        <Controls isLoading={isLoading} isNew={isNew} isDisabled={isDisabled} type={type}/>
      </GridItem>
    </Header>
  );
};
