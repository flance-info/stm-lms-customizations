import { FC, useEffect, useState } from 'react';
import { ModalBody, ModalFooter, ModalHeader, Text } from '@chakra-ui/react';

import { ErrorFallback } from '~/components/error-fallback';
import { Footer } from '../footer';
import { Item } from '../item';
import { Loader } from '~/components/loader';
import { SelectSectionProps } from './select-section-interfaces';
import { useAddToCourseApi } from './select-section-hooks';
import { useCourseContext } from '../course-modal-context';
import { useGetSections } from '~/common/hooks';
import { useTranslate } from '~/services';
import { WithSections } from './with-sections';

export const SelectSection: FC<SelectSectionProps> = ({ changeRoute, onClose }) => {
  const [sectionId, setSectionId] = useState<number | undefined>();
  const { __ } = useTranslate();

  useEffect(() => () => changeRoute('courses'), []);

  const { course } = useCourseContext();
  if (!course?.id) return null;

  const { data, isLoading, error } = useGetSections(course?.id.toString());
  const {
    addToCourseHandler,
    createMaterial,
  } = useAddToCourseApi({ courseId: course.id.toString(), sectionId, onClose, changeRoute });

  if (error) {
    return <ErrorFallback message={(error as Error).message} />;
  }

  return (
    <>
      <ModalHeader>
        <Text color="dark" fontSize="xl" fontWeight="medium">{__('Select section')}</Text>
        <Text color="dark70" fontSize="sm" fontWeight="medium">{__('Course')}{`: ${course?.title}`}</Text>
      </ModalHeader>
      <ModalBody minHeight="234px">
        {isLoading
          ? <Loader/>
          : <WithSections isExistSections={!!data?.sections.length}>
              {data?.sections.map(section => {
                const { id, title } = section;
                const onClick = () => setSectionId(id);

                return <Item key={id} title={title} isChecked={sectionId === id} onClick={onClick}/>;
              })}
            </WithSections>
        }
      </ModalBody>
      <ModalFooter>
        <Footer
          onCancel={() => changeRoute('courses')}
          onSave={addToCourseHandler}
          isDisabled={!sectionId}
          isLoading={createMaterial.isLoading || createMaterial.isSuccess}
          isSection
        />
      </ModalFooter>
    </>
  );
};
