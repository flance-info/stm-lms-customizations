import { useState } from 'react';

import { formatSizeUnits, parseSizeUnits } from '~/helpers/file';
import { getCourseBuilderSettings } from '~/common/hooks';
import { MediaGalleryFile } from '../../../media-gallery-interfaces';
import { TOAST_STATUS } from '~/common/constants';
import { useMediaGalleryContext } from '../../../media-gallery-context';
import { useToast } from '~/components/toast';
import { useTranslate } from '~/services';

export const useEditing = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const onEdit = () => {
    setIsEdit(true);
  };

  const onCancel = () => {
    setIsEdit(false);
  };

  return { isEdit, onEdit, onCancel };
};

export const useAddFile = (media: MediaGalleryFile) => {
  const { sprintf } = useTranslate();
  const { onAddFile, onClose } = useMediaGalleryContext();
  const toast = useToast();
  const settings = getCourseBuilderSettings();
  const maxSize = settings.data ? settings.data.options.max_upload_size : 0;
  const parsedSize = parseSizeUnits(media.size);

  const onClick = () => {
    if (parsedSize > maxSize) {
      const size = formatSizeUnits(maxSize);
      toast({ message: sprintf('File is larger than %s', size), type: TOAST_STATUS.ERROR });
    } else {
      onAddFile(media);
      onClose();
    }
  };

  return onClick;
};
