import findIndex from 'lodash/findIndex';
import { useMutation } from 'react-query';

import { TOAST_STATUS } from '~/common/constants';
import { ServerError } from '~/models';
import { useApi, useTranslate } from '~/services';
import { useErrorToastOptions } from '~/common/hooks';
import { useMediaGalleryContext } from '../../../../media-gallery-context';
import { useToast } from '~/components/toast';

export const useEditFile = (onCancel: () => void) => {
  const api = useApi();
  const toast = useToast();
  const { __ } = useTranslate();
  const { files, setFiles } = useMediaGalleryContext();

  return useMutation(api.wordpress.updateMediaTitle, {
    onSuccess: (response) => {
      toast({ message: __('File title successfully changed'), type: TOAST_STATUS.SUCCESS });
      const updatedFileIndex = findIndex(files, { id: response.id });
      const updatedFiles = files.map((file, index) => {
        if (index === updatedFileIndex) {
          return { ...file, title: response.title.raw };
        }
        return file;
      });

      setFiles(updatedFiles);
      onCancel();
    },
    onError: (err: ServerError) => {
      const errorToastOptions = useErrorToastOptions(err, __('Failed to change file title'));
      toast(errorToastOptions);
    },
  });
};
