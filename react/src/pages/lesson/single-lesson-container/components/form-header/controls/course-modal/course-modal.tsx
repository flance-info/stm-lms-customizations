import { FC, useState } from 'react';
import { Button, Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import { CourseContextProvider } from './course-modal-context';
import { Loader } from '~/components/loader';
import { SelectCourse } from './select-course';
import { SelectSection } from './select-section';
import { useApi, useTranslate } from '~/services';

export const CourseModal: FC = () => {
  const { __ } = useTranslate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [route, setRoute] = useState<string>('courses');
  const onChangeRoute = (path: string) => setRoute(path);

  const api = useApi();
  const getRecentCourses = useQuery('recent_courses', api.wordpress.getRecentCourses,
    { enabled: isOpen });

  return (
    <>
      <Button
        m="0"
        onClick={onOpen}
        bg="dark70"
        color="white"
      >
        {__('Add to course')}
      </Button>
      <Modal variant="course" size="2xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <CourseContextProvider>
          <ModalContent>
            {getRecentCourses.isLoading
              ? <Loader/>
              : route === 'courses'
                ? <SelectCourse changeRoute={onChangeRoute} onClose={onClose} recentCourses={getRecentCourses.data}/>
                : <SelectSection changeRoute={onChangeRoute} onClose={onClose}/>
            }
          </ModalContent>
        </CourseContextProvider>
      </Modal>
    </>
  );
};
