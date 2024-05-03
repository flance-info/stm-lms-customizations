import { FC, memo } from 'react';
import { chakra, Flex, Icon as ChakraIcon, Text } from '@chakra-ui/react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import queryString from 'query-string';

import { LessonCardProps } from './lesson-card-interfaces';
import { Popup } from './popup';
import { useGetLessonIcon } from './lesson-card-hooks';

import { ReactComponent as LockIcon } from '~/assets/icons/lock-icon.svg';

const CardContainer = chakra(Flex, {
  baseStyle: {
    position: 'relative',
    flexDirection: 'column',
    border: '1px solid',
    borderColor: 'border',
    borderRadius: '10px',
    minWidth: '117px',
    minHeight: '117px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shouldForwardProp() {
    return true;
  },
});

export const LessonCard: FC<LessonCardProps> = memo(({ onClose, lesson, sectionId }) => {
  const { type, isLocked } = lesson;
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();

  const iconColor = isLocked ? 'dark50' : 'primary';
  const { Icon, title } = useGetLessonIcon(type);

  const navigateToLesson = () => {
    if (isLocked) return;
    let path = '/';
    const lessonType = queryString.stringify({ type });
    if (courseId && sectionId) {
      path = generatePath(
        `./sections/:sectionId/lessons/new?${lessonType}`,
        { sectionId }
      );
    } else {
      path = generatePath(`/edit-lesson/new?${lessonType}`);
    }

    navigate(path);

    if (onClose) {
      onClose();
    }
  };

  return (
    <CardContainer
      _hover={{
        cursor: isLocked ? 'not-allowed' : 'pointer',
        border: isLocked ? '1px solid' : '2px solid',
        borderColor: isLocked ? 'border' : 'primary',
      }}
      onClick={navigateToLesson}
    >
      {isLocked && <Popup type={type}/>}
      <Flex>
        <ChakraIcon as={Icon} fill={iconColor} fontSize="38px"/>
        {isLocked && <ChakraIcon as={LockIcon} position="absolute" top="10px" right="10px"/>}
      </Flex>
      <Text fontSize="sm" color="dark70" mt="10px" display="inline-block" textAlign="center" w="100px">
        {title}
      </Text>
    </CardContainer>
  );
});
