import { useRef } from 'react';
import { chakra, Flex, Text, ToastId, useToast as useChakraToast } from '@chakra-ui/react';

import { CloseButton } from '~/components/close-button';
import { TOAST_STATUS } from '~/common/constants';

interface ToastProps {
  message: string;
  type: TOAST_STATUS;
}

const ToasterContainer = chakra(Flex, {
 baseStyle: {
   justifyContent: 'space-between',
   minWidth: '200px',
   minHeight: '40px',
   borderRadius: '4px',
   background: 'white',
 },
});

export const useToast = () => {
  const chakraToast = useChakraToast();
  const toastIdRef = useRef<ToastId | undefined>();

  const onClose = () => {
    if (toastIdRef.current) {
      chakraToast.close(toastIdRef.current);
    }
  };

  const showToast = ({ message, type }: ToastProps) => {
    toastIdRef.current = chakraToast({
      position: 'top-right',
      isClosable: true,
      duration: 5000,
      render: () => (
        <ToasterContainer>
          <Flex gap="10px" alignItems="center">
            <Flex
              bg={type === TOAST_STATUS.SUCCESS ? 'primary' : 'error'}
              w="4px"
              h="100%"
              borderRadius="4px"
            />
            <Text fontSize="sm" color="dark">{message}</Text>
          </Flex>
          <CloseButton onClick={onClose}/>
        </ToasterContainer>
      ),
    });
  };

  return showToast;
};
