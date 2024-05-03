import { useTranslate } from '~/services';

export const useGetOptions = () => {
  const { __ } = useTranslate();

  return {
    duration_measure: [
      { id: 'minutes', label: __('Minutes') },
      { id: 'hours', label: __('Hours') },
      { id: 'days', label: __('Days') },
    ],
    style: [
      { id: 'default', label: __('Default') },
      { id: 'pagination', label: __('Pagination') },
      { id: 'global', label: __('Global') },
    ]
  };
};

