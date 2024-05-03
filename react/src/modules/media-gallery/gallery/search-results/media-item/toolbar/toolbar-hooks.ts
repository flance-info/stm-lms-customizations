import { useMutation } from 'react-query';

import { ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useConfirm, useErrorToastOptions } from '~/common/hooks';
import { useMediaGalleryContext } from '../../../../media-gallery-context';
import { useToast } from '~/components/toast';

export const useRemoveFile = (id: number) => {
  const api = useApi();
  const { __ } = useTranslate();
  const toast = useToast();
  const { files, setFiles } = useMediaGalleryContext();

  const { isLoading, mutate } = useMutation(api.mediaGallery.remove, {
    onSuccess: () => {
      toast({ message: __('The file has been removed successfully'), type: TOAST_STATUS.SUCCESS });
      const filteredFiles = files.filter(file => file.id !== id);
      setFiles(filteredFiles);
    },
    onError: (err: ServerError) => {
      const errorToastOptions = useErrorToastOptions(err, __('Failed to remove file'));
      toast(errorToastOptions);
    },
  });
  const confirmRemove = useConfirm(
    () => mutate(id),
    __('Are you sure you want to delete this file?')
  );

  return { isLoading, confirmRemove };
};
