
import { useTranslate } from '~/services';

export const useGetFileTypeOptions = () => {
  const { __ } = useTranslate();

  const options = [
    {
      id: 'all',
      label: __('All files'),
    },
    {
      id: 'image',
      label: __('Images'),
    },
    {
      id: 'application',
      label: __('Documents'),
    },
    {
      id: 'video',
      label: __('Video'),
    },
    {
      id: 'audio',
      label: __('Audio'),
    },
  ];
  return options;
};

export const useGetSortOptions = () => {
  const { __ } = useTranslate();
  const options = [
    { id: 'title', label: __('by name') },
    { id: 'date', label: __('by date') },
  ];

  return options;
};
