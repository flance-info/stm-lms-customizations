import { FC, memo } from 'react';
import { Flex, ModalBody, ModalHeader, Text } from '@chakra-ui/react';

import { CloseModalButton } from '~/components/close-modal-button';
import { ContentProps } from './content-interfaces';
import { Dropzone } from './drop-zone';
import { Loader } from '~/components/loader';
import { useTranslate } from '~/services';

export const Content: FC<ContentProps> = memo(({ onDrop, onClose, isLoading }) => {
  const { __ } = useTranslate();

  return (
    <>
      <ModalHeader p="0 0 30px" position="relative">
        <Flex flexDirection="column" alignItems="center" gap="5px">
          <Text fontSize="xl" color="dark" mt="20px" fontWeight="medium" lineHeight="xxl">
            {__('Import SCORM Package')}
          </Text>
          <Text fontSize="sm" color="dark50" fontWeight="medium">
            {__('Course will have one lesson with SCORM package content.')}
          </Text>
        </Flex>
        <CloseModalButton onClick={onClose} />
      </ModalHeader>
      <ModalBody p="0" minHeight="236px">
        {isLoading ? <Loader/> : <Dropzone onDrop={onDrop}/>}
      </ModalBody>
    </>
  );
});
