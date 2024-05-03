import { FC, useEffect } from 'react';
import { Button, Flex, ModalBody, ModalFooter, ModalHeader, Text } from '@chakra-ui/react';

import { CloseModalButton } from '~/components/close-modal-button';
import { useTranslate } from '~/services';

interface ErrorProps {
  onClose: () => void;
  message: string;
  onClear: () => void;
}

export const Error: FC<ErrorProps> = ({ onClose, message, onClear }) => {
  const { __ } = useTranslate();

  useEffect(() => onClear, []);

  return (
    <>
      <ModalHeader p="0 0 20px" position="relative">
        <Flex flexDirection="column" alignItems="center">
          <Text fontSize="xl" color="dark" fontWeight="medium" lineHeight="xxl" mt="20px">
            {__('SCORM Package contains some errors')}
          </Text>
          <CloseModalButton onClick={onClose} />
        </Flex>
      </ModalHeader>
      <ModalBody
        minHeight="164px"
        maxHeight="300px"
        overflowY="auto"
        p="10px"
        bg="errorBg"
        color="error"
        borderRadius="4px"
      >
        {message}
      </ModalBody>
      <ModalFooter justifyContent="center" p="10px 0">
        <Button variant="primary" onClick={onClose}>{__('Close')}</Button>
      </ModalFooter>
    </>
  );
};
