import { FC, useState } from 'react';
import { Box, Button, Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';

import { CategoryModalProps } from './category-modal-interfaces';
import { Form } from './form';
import { SuccessView } from './success-view';

export const CategoryModal: FC<CategoryModalProps> = (props) => {
  const { categories, onCategoryCreated, createCategoryCallback, size = 'default', queryKey } = props;
  const [createdCategory, setCreatedCategory] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCreatedCategory = (category: string) => setCreatedCategory(category);

  return (
    <>
      <Button
        variant="primary"
        m="0"
        h="100%"
        onClick={onOpen}
        size={size === 'sm' ? 'tiny' : undefined}
        borderRadius={size === 'default' ? '4px' : '2px'}
      >
        <Box className="icon-plus-circle" />
      </Button>
      <Modal variant="category" isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          {createdCategory
            ? (
              <SuccessView
                onClear={() => setCreatedCategory('')}
                onClose={onClose}
                categoryName={createdCategory}
              />
            )
            : (
              <Form
                categories={categories}
                createCategoryCallback={createCategoryCallback}
                onCategoryCreated={onCategoryCreated}
                handleCreatedCategory={handleCreatedCategory}
                onClose={onClose}
                queryKey={queryKey}
              />
            )
          }
        </ModalContent>
      </Modal>
    </>
  );
};
