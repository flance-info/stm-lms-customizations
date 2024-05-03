import { FC, memo } from 'react';
import { Button, chakra, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { useFieldArray } from 'react-hook-form';
import { useMutation } from 'react-query';

import { DropzoneProps } from './drop-zone-interfaces';
import { FileCard } from '../file-card';
import { formatSizeUnits } from '~/helpers/file';
import { Loader } from '~/components/loader';
import { MediaGallery } from 'modules/media-gallery';
import { MediaGalleryFile } from 'modules/media-gallery/media-gallery-interfaces';
import { ServerError } from '~/models';
import { EAddon, TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from 'services';
import { getCourseBuilderSettings, useErrorToastOptions, useHasPluginsOrAddons } from '~/common/hooks';
import { useToast } from '~/components/toast';

const DropzoneContainer = chakra(Flex, {
  baseStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    border: '1px dashed',
    borderColor: 'dark30',
    borderRadius: '4px',
    minHeight: '236px',
    background: 'mainBackground',
    padding: '10px 16px 20px 10px',
  },
});

export const Dropzone: FC<DropzoneProps> = memo(({ name, isDisabled }) => {
  const { append, fields, remove } = useFieldArray({ name, keyName: 'fieldId' });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hasAddon } = useHasPluginsOrAddons();
  const settings = getCourseBuilderSettings();
  const options = settings?.data?.options;
  const maxSize = hasAddon(EAddon.MEDIA_LIBRARY) ? options.media_library.max_upload_size : options.max_upload_size;
  const toast = useToast();
  const { __, sprintf } = useTranslate();

  const api = useApi();
  const postFile = useMutation(api.files.post, {
    onSuccess: (response) => {
      append({
        id: response.id,
        label: response.title.raw,
        type: response.mime_type,
        size: response.media_details.filesize,
        url: response.source_url,
      });
      toast({ message: __('The file has been uploaded successfully'), type: TOAST_STATUS.SUCCESS });
    },
    onError: (error: ServerError) => {
      const errorToastOptions = useErrorToastOptions(error, __('Validation error'));
      toast(errorToastOptions);
    },
  });

  const onAddMediaGalleryFile = (file: MediaGalleryFile) => {
    append({
      id: file.id,
      label: file.title,
      type: file.type,
      size: file.size,
      url: file.url,
    });
    toast({ message: __('The file has been uploaded successfully'), type: TOAST_STATUS.SUCCESS });
  };

  const onDrop = (droppedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles && rejectedFiles.length) {
      const rejectedFile = rejectedFiles[0];
      if (rejectedFile.file.size > maxSize) {
        const size = formatSizeUnits(maxSize);
        toast({ message: sprintf('File is larger than %s', size), type: TOAST_STATUS.ERROR });
      }
    }
    const attachedFile = droppedFiles[0];
    const filePayload = { file: attachedFile, title: attachedFile.name };
    postFile.mutate(filePayload);
  };

  const { getRootProps, open, getInputProps } = useDropzone({
    maxSize,
    multiple: false,
    noClick: true,
    noKeyboard: true,
    onDrop,
    disabled: isDisabled,
  });

  return (
    <DropzoneContainer
      justifyContent={!fields.length ? 'center' : 'normal'}
      {...getRootProps()}
    >
      {!!fields.length && (
        <Flex flexDirection="column" gap="10px" opacity={postFile.isLoading ? 0.7 : 1}>
          {fields.map((field, index) => {
            const removeFile = () => remove(index);
            // @ts-ignore
            return <FileCard key={field.fieldId} file={field} name={name} removeFile={removeFile} />;
          })}
        </Flex>
      )}
      <Flex flexDirection="column" alignItems="center">
        {postFile.isLoading
          ? <Loader/>
          : <>
            <input {...getInputProps()} />
              <Text fontSize="sm" color="dark70" m="15px 0 5px">
                {__('Drag & drop files here or browse files from your computer ')}
              </Text>
              <Button
                width="130px"
                variant="primary"
                onClick={hasAddon(EAddon.MEDIA_LIBRARY) ? onOpen : open}
                isDisabled={isDisabled}
              >
                {__('Browse files')}
              </Button>
            </>
        }
      </Flex>
      <MediaGallery isOpen={isOpen} onClose={onClose} onAddFile={onAddMediaGalleryFile}/>
    </DropzoneContainer>
  );
});
