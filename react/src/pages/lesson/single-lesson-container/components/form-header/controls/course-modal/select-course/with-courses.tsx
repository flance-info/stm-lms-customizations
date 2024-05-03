import { FC } from 'react';
import { AbsoluteCenter } from '@chakra-ui/react';

import { Course } from '~/models';
import { Item } from '../item';
import { useTranslate } from '~/services';
import { useCourseContext } from '../course-modal-context';

interface WithCourses {
  courses: Course[];
  isSearching: boolean;
}

export const WithCourses: FC<WithCourses> = ({ courses, isSearching }) => {
  const { __ } = useTranslate();
  const { course, onChangeCourse } = useCourseContext();

  return (
    <>
      {!!courses.length && courses.map(item => {
        const { id, title } = item;
        const onClick = () => onChangeCourse({ title, id });
        return (
          <Item
            key={id}
            title={title}
            onClick={onClick}
            isChecked={course?.id === id}
          />
        );
      })}
      {isSearching && !courses.length && <AbsoluteCenter>{__('Course not found')}</AbsoluteCenter>}
    </>
  );
};