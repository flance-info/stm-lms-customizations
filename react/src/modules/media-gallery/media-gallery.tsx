import { FC } from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

import { CloseButton } from 'components/close-button';
import { Gallery } from './gallery';
import { MediaGalleryContextProvider } from './media-gallery-context';
import { MediaGalleryProps } from './media-gallery-interfaces';
import { useTranslate } from '~/services';

export const MediaGallery: FC<MediaGalleryProps> = ({ onAddFile, isOpen, onClose, fileType }) => {
  const { __ } = useTranslate();

  return (
    <MediaGalleryContextProvider onAddFile={onAddFile} onClose={onClose}>
      <Modal variant="mediaGallery" size="6xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text
              color="dark"
              fontSize="lg"
              fontWeight="medium"
            >
              {__('Media Gallery')}
            </Text>
            <CloseButton onClick={onClose} m={0}/>
          </ModalHeader>
          <ModalBody>
            <Gallery fileType={fileType}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </MediaGalleryContextProvider>
  );
};
