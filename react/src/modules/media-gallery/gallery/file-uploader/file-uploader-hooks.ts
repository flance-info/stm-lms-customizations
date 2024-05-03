import { useCallback, useRef, useState } from 'react';
import { FileRejection } from 'react-dropzone';
import { useMutation } from 'react-query';

import { Config } from '~/services/interfaces';
import { formatSizeUnits } from '~/helpers/file';
import { ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { getCourseBuilderSettings, useErrorToastOptions } from '~/common/hooks';
import { getMimeType } from './file-uploader-utils';
import { MediaGalleryFile } from '../../media-gallery-interfaces';
import { useMediaGalleryContext } from '../../media-gallery-context';
import { useToast } from '~/components/toast';

// eslint-disable-next-line
export const useUploadFile = (maxSize: number, resetFilters: () => void, isChangedFilters: boolean) => {
  const [title, setTitle] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);

  const { files, setFiles } = useMediaGalleryContext();
  const api = useApi();
  const { __, sprintf } = useTranslate();
  const toast = useToast();

  const abortControllerRef = useRef<AbortController | null>(null);

  const uploadFile = useMutation(api.mediaGallery.upload, {
    onSuccess: async (response: { file: MediaGalleryFile }) => {
      toast({ message: __('The file has been uploaded successfully'), type: TOAST_STATUS.SUCCESS });
      setTitle('');
      setProgress(0);

      const updatedFiles = [...files];
      updatedFiles.unshift(response.file);
      setFiles(updatedFiles);
    },
    onError: (error: ServerError) => {
      if (error === 'ERR_CANCELED') return;
      const errorToastOptions = useErrorToastOptions(error, __('Validation error'));
      setProgress(0);
      toast(errorToastOptions);
    },
  });

  const onDrop = async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles && rejectedFiles.length) {
      const { file, errors } = rejectedFiles[0];
      if (file.size > maxSize) {
        const size = formatSizeUnits(maxSize);
        toast({ message: sprintf('File is larger than %s', size), type: TOAST_STATUS.ERROR });
      }

      if (errors[0].code === 'file-invalid-type') {
        toast({ message: __('This file format is not supported'), type: TOAST_STATUS.ERROR });
      }
    }

    const file = acceptedFiles[0];
    setTitle(file.name);

    abortControllerRef.current = new AbortController();

    const config: Config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const progressPercentage = Math.round((loaded * 100) / (total || 1));
        setProgress(progressPercentage);
      },
      signal: abortControllerRef.current.signal,
    };

    await uploadFile.mutate({ file, config });
  };

  const reset = useCallback(() => {
    abortControllerRef.current?.abort();
    uploadFile.reset();
    setProgress(0);
  }, [uploadFile.reset, setProgress]);

  return { ...uploadFile, onDrop, title, progress, reset };
};

export const useAcceptedTypes = () => {
  const settings = getCourseBuilderSettings();
  const allowedExtensions: string[] = settings.data.options.media_library.allowed_extensions || [];
  const acceptedTypes: { [key: string]: [] } = {};

  allowedExtensions.forEach(ext => {
    const mimeType = getMimeType(ext);
    if (mimeType) {
      if (!acceptedTypes[mimeType]) {
        acceptedTypes[mimeType] = [];
      }
    }
  });

  return acceptedTypes;
};
