import { FC, memo } from 'react';
import { Button, chakra, Flex, Icon, Text } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';

import { DropzoneProps } from './drop-zone-interfaces';
import { useTranslate } from '~/services';

import { ReactComponent as ScormIcon } from '~/assets/icons/scorm.svg';

const DropzoneWrapper = chakra(Flex, {
  baseStyle: {
    maxWidth: '540px',
    height: '236px',
    border: '1px dashed #B3BAC2',
    borderRadius: '4px',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
});

const Container = chakra(Flex, {
  baseStyle: {
    flexDirection: 'column',
    height: '140px',
    alignItems: 'center',
  },
});

export const Dropzone: FC<DropzoneProps> = memo(({ onDrop }) => {
  const { __ } = useTranslate();
  const { getRootProps, open, getInputProps } = useDropzone({
    accept: { 'application/zip': ['.zip'] },
    multiple: false,
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    onDrop,
  });

  return (
    <DropzoneWrapper {...getRootProps()}>
      <Container>
        <input {...getInputProps()} />
        <Icon as={ScormIcon} fontSize="40px"/>
        <Text fontSize="sm" color="dark70" m="15px 0">
          {__('Choose SCORM package file .zip')}
        </Text>
        <Button variant="primary" onClick={open} m="0">
          {__('Select file')}
        </Button>
      </Container>
    </DropzoneWrapper>
  );
});
