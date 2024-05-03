import { FC, useMemo } from 'react';
import { Button, chakra, Flex, Text } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';

import { getCourseBuilderSettings } from '~/common/hooks';
import { formatSizeUnits } from '~/helpers/file';
import { ProgressBar } from './progress-bar';
import { useAcceptedTypes, useUploadFile } from './file-uploader-hooks';
import { useTranslate } from '~/services';

const Dropzone = chakra(Flex, {
  baseStyle: {
    width: '100%',
    minHeight: '191px',
    border: '2px dashed',
    borderRadius: 'sm',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface FileUploaderProps {
  resetFilters: () => void;
  isChangedFilters: boolean;
}

export const FileUploader: FC<FileUploaderProps> = ({ resetFilters, isChangedFilters }) => {
  const settings = getCourseBuilderSettings();
  const maxSize = settings.data ? settings.data.options.media_library.max_upload_size : 0;
  const { onDrop, isLoading, progress, title, reset } = useUploadFile(maxSize, resetFilters, isChangedFilters);
  const acceptedTypes = useAcceptedTypes();
  const { __, sprintf } = useTranslate();
  const { getRootProps, getInputProps, open, isDragAccept } = useDropzone({
    maxFiles: 1,
    maxSize,
    accept: acceptedTypes,
    multiple: false,
    noClick: true,
    noKeyboard: true,
    onDrop,
  });

  const style = useMemo(() => ({
    borderColor: !isDragAccept ? 'border' : 'primary',
    background: !isDragAccept ? 'inherit' : 'mainBackground',
  }), [isDragAccept]);

  const maxSizeString = formatSizeUnits(maxSize);

  return (
    <Dropzone {...getRootProps()} sx={style}>
      {isLoading
        ? <ProgressBar progress={progress} title={title} onCancel={reset}/>
        : (
          <Flex flexDirection="column" gap="10px" alignItems="center">
            <input {...getInputProps()}/>
            <Text color="dark" fontSize="lg" fontWeight="medium">
              {!isDragAccept ? __('Upload file') : __('Drag file here')}
            </Text>
            <Text color="dark50" fontWeight="medium">
              {!isDragAccept
                ? __('Drag & drop files here or browse files from your computer')
                : sprintf(__('Maximum file size: %s'), maxSizeString)
              }
            </Text>
            {!isDragAccept && <Button variant="primary" m="10px 0 0" onClick={open}>
              {__('Browse files')}
            </Button>
            }
          </Flex>
        )
      }
    </Dropzone>
  );
};
