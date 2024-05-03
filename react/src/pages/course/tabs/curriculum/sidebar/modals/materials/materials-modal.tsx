import { FC, memo } from 'react';
import { Button, Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import { Loader } from '~/components/loader';
import { MaterialsContent } from './materials-content';
import { MaterialsModalProps } from './materials-modal-interfaces';
import { useApi, useTranslate } from 'services';
import { useCourse } from '../../../../../course-page-hooks';

import { ReactComponent as SearchIcon } from '~/assets/icons/search-icon.svg';

export const MaterialsModal: FC<MaterialsModalProps> = memo(({ section }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { __ } = useTranslate();

  const { courseId } = useCourse();
  if (!courseId) return null;

  const api = useApi();
  const { data, isLoading, isSuccess } = useQuery(
    ['import-materials', courseId],
    ({ queryKey }) => {
      const [, id] = queryKey;
      return api.materials.get(id);
    },
    {
      enabled: isOpen,
    },
  );

  const recentMaterials = isSuccess ? data.results : [];

  return (
    <>
      <Button
        variant="materials"
        leftIcon={<SearchIcon/>}
        minHeight="40px"
        fontWeight="bold"
        m="0"
        onClick={onOpen}
      >
        {__('Search materials')}
      </Button>
      <Modal variant="materials" size="2xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
        <ModalContent>
          {isLoading
            ? <Loader/>
            : <MaterialsContent recentMaterials={recentMaterials} onClose={onClose} section={section} />
          }
        </ModalContent>
      </Modal>
    </>
  );
});
