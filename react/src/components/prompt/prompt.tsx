import { FC } from 'react';
import ReactRouterPrompt from 'react-router-prompt';
import { Button, Modal, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { unstable_BlockerFunction as BlockerFunction } from 'react-router-dom';

import { useTranslate } from '~/services';

interface PromptProps {
  when: BlockerFunction;
}

export const Prompt: FC<PromptProps> = ({ when }) => {
  const { __ } = useTranslate();
  return (
    <ReactRouterPrompt when={when}>
      {/*@ts-ignore*/}
      {({ isActive, onConfirm, onCancel }) => (
        <Modal isOpen={isActive} onClose={onCancel} variant="prompt">
          <ModalOverlay/>
          <ModalContent>
            <ModalHeader>
              {__('All unsaved data will be lost. Do you really want to leave this page?')}
            </ModalHeader>
            <ModalFooter>
              <Button
                onClick={onCancel}
                m="0"
              >
                {__('Cancel')}
              </Button>
              <Button
                onClick={onConfirm}
                variant="error"
                m="0"
              >
                {__('Confirm')}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </ReactRouterPrompt>
  );
};
