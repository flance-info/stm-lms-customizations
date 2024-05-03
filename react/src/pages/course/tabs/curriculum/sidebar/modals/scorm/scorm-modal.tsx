import { FC, memo, useState } from 'react';
import { Button, Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';

import { Content } from './content';
import { Error } from './error';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useCourse } from '../../../../../course-page-hooks';
import { useErrorToastOptions } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const ScormModal: FC = memo(() => {
  const [errorMessage, setError] = useState<string>('');

  const { courseId } = useParams<{ courseId: string }>();
  if (!courseId) return null;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { __ } = useTranslate();
  const api = useApi();
  const toast = useToast();
  const { invalidate } = useCourse();

  const { mutate, isLoading } = useMutation(api.curriculum.scorm.post, {
    onSuccess: () => {
      toast({ message: __('SCORM successfully loaded'), type: TOAST_STATUS.SUCCESS });
      invalidate();
    },
    onError: (err: string) => {
      setError(err);
      const errorToastOptions = useErrorToastOptions(err, __('Failed to load SCORM'));
      toast(errorToastOptions);
    },
  });

  const onDrop = (acceptedFiles: File[]) => {
    mutate({ courseId, file: acceptedFiles[0] });
  };

  return (
    <>
      <Button
        m="0px"
        leftIcon={<span className="icon-upload-materials"></span>}
        bg="#EEF1F7"
        _hover={{ pointEvents: 'none' }}
        h="30px"
        p="7px 0 0"
        onClick={onOpen}
      >
        {__('Import SCORM')}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent p="30px">
          {errorMessage
            ? <Error onClose={onClose} message={errorMessage} onClear={() => setError('')}/>
            : <Content onDrop={onDrop} onClose={onClose} isLoading={isLoading}/>
          }
        </ModalContent>
      </Modal>
    </>
  );
});
