import { FC } from 'react';
import { Input, InputGroup, InputRightElement, ModalBody, ModalFooter, ModalHeader } from '@chakra-ui/react';

import { ErrorFallback } from '~/components/error-fallback';
import { Footer } from '../footer';
import { Item } from '../item';
import { Loader } from '~/components/loader';
import { SelectCourseProps } from './select-course-interfaces';
import { useCourseContext } from '../course-modal-context';
import { useSearchFilters } from './select-course-hooks';
import { useTranslate } from '~/services';
import { WithCourses } from './with-courses';

import { ReactComponent as SearchIcon } from '~/assets/icons/search-icon.svg';

export const SelectCourse: FC<SelectCourseProps> = ({ recentCourses, changeRoute, onClose }) => {
  const { isLoading, searchTerm, onChangeSearchTerm, searchResults, error } = useSearchFilters();
  const { course, onChangeCourse } = useCourseContext();
  const { __ } = useTranslate();

  if (error) {
    return <ErrorFallback message={(error as Error).message}/>;
  }

  return (
    <>
      <ModalHeader>
        <InputGroup>
          <Input
            variant="msVariant"
            value={searchTerm}
            onChange={onChangeSearchTerm}
            placeholder={__('Search courses')}
          />
          <InputRightElement><SearchIcon/></InputRightElement>
        </InputGroup>
      </ModalHeader>
      <ModalBody>
        {isLoading ? <Loader/> : <WithCourses courses={searchResults} isSearching={!!searchTerm}/>}
        {!searchTerm && recentCourses.map(item => {
          const { id, title } = item;
          const onClick = () => onChangeCourse({ title, id });
          return (
            <Item
              key={id}
              title={title}
              isChecked={id === course?.id}
              onClick={onClick}
            />
          );
        })}
      </ModalBody>
      <ModalFooter>
        <Footer onCancel={onClose} onSave={() => changeRoute('sections')} isDisabled={!course}/>
      </ModalFooter>
    </>
  );
};
