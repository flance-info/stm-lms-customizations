import { ChangeEvent } from 'react';
import { FileRejection } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { useMutation } from 'react-query';

import { formatSizeUnits } from '~/helpers/file';
import { MediaGalleryFile } from 'modules/media-gallery/media-gallery-interfaces';
import { ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useErrorToastOptions } from '~/common/hooks';
import { useToast } from '~/components/toast';

interface UseUploadProps {
  name: string;
  maxSize: number;
}

export const useDropFileApi = ({ name, maxSize }: UseUploadProps) => {
  const { setValue } = useFormContext();
  const api = useApi();
  const toast = useToast();
  const { __, sprintf } = useTranslate();

  const postFile = useMutation(api.files.post,
  {
      onSuccess: (response) => {
        const media = {
          id: response.id,
          url: response.source_url,
          type: response.mime_type ? response.mime_type : '',
          title: response.title.raw,
        };
        setValue(name, media, { shouldDirty: true });
        toast({ message: __('The file has been uploaded successfully'), type: TOAST_STATUS.SUCCESS });
      },
      onError: (error: ServerError) => {
        const errorToastOptions = useErrorToastOptions(error, __('Validation error'));
        toast(errorToastOptions);
      },
  });

  const uploadFile = (file: File) => {
    const filePayload = { file, title: file.name };
    postFile.mutate(filePayload);
  };

  const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles && rejectedFiles.length) {
      const rejectedFile = rejectedFiles[0];
      if (rejectedFile.file.size > maxSize) {
        const size = formatSizeUnits(maxSize);
        toast({ message: sprintf('File is larger than %s', size), type: TOAST_STATUS.ERROR });
      }
    }
    const file = acceptedFiles[0];
    uploadFile(file);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadFile(file);
  };

  const removeImageHandler = () => {
    setValue(name, null, { shouldDirty: true });
    toast({ message: __('The file has been removed successfully'), type: TOAST_STATUS.SUCCESS });
  };

  const onAddMediaGalleryFile = (file: MediaGalleryFile) => {
    const media = {
      id: file.id,
      url: file.url,
      type: file.type,
      title: file.title,
    };
    setValue(name, media, { shouldDirty: true });
    toast({ message: __('The file has been uploaded successfully'), type: TOAST_STATUS.SUCCESS });
  };

  return {
    onDrop,
    onChange,
    isLoading: postFile.isLoading,
    removeImageHandler,
    onAddMediaGalleryFile,
  };
};
