import { FC, memo } from 'react';
import { Flex, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';

import { CloseModalButton } from '~/components/close-modal-button';
import { LessonCard } from './lesson-card';
import { LessonsModalProps } from './lessons-modal-interfaces';
import { useTranslate } from '~/services';

export const LessonsModal: FC<LessonsModalProps> = memo(({ lessons, exams, sectionId, onClose, isOpen }) => {
  const { __ } = useTranslate();

  return (
    <>
      <Modal variant="lessons" isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex flexDirection="column" gap="5px">
              <Text fontSize="xl" color="dark" fontWeight="medium" lineHeight="xxl">
                {__('Select lesson type')}
              </Text>
              <Text fontSize="sm" fontWeight="medium" color="dark50">
                {__('Select material type to continue')}
              </Text>
            </Flex>
            <CloseModalButton onClick={onClose} />
          </ModalHeader>
          <ModalBody>
            <Flex flexDirection="column">
              <Text fontSize="xs" color="dark70" mb="10px" fontWeight="bold">
                {__('LEARNING CONTENT')}
              </Text>
              <Flex gap="20px" mb="20px" flexWrap={'wrap'} width={'530px'}>
                {lessons.map((lesson) => (
                  <LessonCard key={lesson.type} onClose={onClose} lesson={lesson} sectionId={sectionId} />
                ))}
              </Flex>
              {!!exams &&
                <>
                  <Text fontSize="xs" color="dark70" mb="10px" fontWeight="bold">
                    {__('EXAM STUDENTS')}
                  </Text>
                  <Flex gap="20px">
                    {exams.map((exam) => (
                      <LessonCard key={exam.type} onClose={onClose} lesson={exam} sectionId={sectionId} />
                    ))}
                  </Flex>
                </>
              }
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});
