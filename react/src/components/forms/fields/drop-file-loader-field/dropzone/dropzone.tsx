import isEmpty from 'lodash/isEmpty';
import { createElement, FC, memo } from 'react';
import { Box, Button, chakra, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';

import { ACCEPT_BY_TYPE, PREVIEW_BY_TYPE } from './dropzone-constants';
import { Dimmer } from './dimmer';
import { DropzoneProps, DropzoneType } from './dropzone-interfaces';
import { EAddon } from '~/common/constants';
import { formatSizeUnits } from '~/helpers/file';
import { getCourseBuilderSettings, useHasPluginsOrAddons } from '~/common/hooks';
import { Loader } from '~/components/loader';
import { MediaGallery } from 'modules/media-gallery';
import { useDropFileApi } from './dropzone-hooks';
import { useTranslate } from '~/services';

const DropzoneContainer = chakra(Box, {
  baseStyle: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px dashed #B3BAC2',
    width: '100%',
    height: '236px',
    margin: 0,
    borderRadius: '4px',
  },
});

const DropzoneLabel = chakra(Text, {
  baseStyle: {
    fontSize: 'sm',
    color: 'dark50',
    my: '15px',
    px: '15px',
    textAlign: 'center',
  },
});

export const Dropzone: FC<DropzoneProps> = memo((props) => {
  const { type = 'default', name, value: media } = props;
  const { __ } = useTranslate();
  const settings = getCourseBuilderSettings();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hasAddon } = useHasPluginsOrAddons();
  const hasMediaLibrary = hasAddon(EAddon.MEDIA_LIBRARY);
  const options = settings.data ? settings.data.options : {};

  const maxSize = isEmpty(options)
    ? 0
    : hasMediaLibrary ? options.media_library.max_upload_size : options.max_upload_size;
  const { onDrop, isLoading, removeImageHandler, onAddMediaGalleryFile } = useDropFileApi({ name, maxSize });
  const { getRootProps, getInputProps, open } = useDropzone({
    ...(type ? { accept: ACCEPT_BY_TYPE[type] } : {}),
    maxSize,
    maxFiles: 1,
    multiple: false,
    noClick: true,
    noKeyboard: true,
    onDrop,
  });

  const size = formatSizeUnits(maxSize);
  const stringsByType = (type: DropzoneType = 'default') => {
    switch (type) {
      case 'image':
        return {
          label: __('Drag and drop an image or upload it from your computer'),
          button: __('Upload an image'),
        };
      case 'video':
        return {
          label: __('Drag & drop a video here or browse it from your computer'),
          button: __('Browse files'),
        };
      case 'default':
        return {
          label: __('Drag file here'),
          button: __('Upload file'),
        };
    }
  };

  const strings = stringsByType(type);

  return (
    <Flex>
      <DropzoneContainer
        className={media ? 'with-media' : ''}
        {...getRootProps()}
      >
        <Dimmer removeImageHandler={removeImageHandler} size={size}/>
        {media ? createElement(PREVIEW_BY_TYPE[type], { media }) : isLoading
          ? <Loader/>
          : <Flex flexDirection="column" align="center" justify="center">
              <input {...getInputProps()} />
              <span className="icon-upload-image" />
              <DropzoneLabel>{strings.label}</DropzoneLabel>
              <Button width="130px" variant="primary" onClick={hasMediaLibrary ? onOpen : open}>
                {strings.button}
              </Button>
            </Flex>
        }
      </DropzoneContainer>
      <MediaGallery isOpen={isOpen} onClose={onClose} onAddFile={onAddMediaGalleryFile}/>
    </Flex>
  );
});
