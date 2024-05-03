import { ChangeEvent, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { SingleValue } from 'react-select';

import { MediaGalleryPayload } from '~/services/resources/media-gallery/interfaces';
import { Option } from '~/models';
import { useApi } from '~/services';
import { useDebounce } from '~/common/hooks';
import { useMediaGalleryContext } from '../media-gallery-context';

export const useSearchFilters = ( initFileType: string) => {
  const [title, setTitle] = useState<string>('');
  const [fileType, setFileType] = useState<string>(initFileType);
  const [sort, setSort] = useState<string>('date');
  const [offset, setOffset] = useState<number>(0);

  const debouncedTitle = useDebounce(title, 500);
  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setOffset(0);
  };

  const onChangeFileType = (newValue: SingleValue<Option>) => {
    setFileType(newValue!.id.toString());
    setOffset(0);
  };

  const onChangeSort = (newValue: SingleValue<Option>) => {
    setSort(newValue!.id.toString());
    setOffset(0);
  };

  const onResetFilters = () => {
    if (title !== '') {
      setTitle('');
    }
    if (fileType !== 'all') {
      setFileType('all');
    }

    if (sort !== 'date') {
      setSort('date');
    }

    setOffset(0);
  };

  const isChangedFilters = initFileType === 'all' || title !== '' || fileType !== 'all' || sort !== 'date';

  const memoizedValues = useMemo(
    () => ({
      payload: {
        filter: { search: debouncedTitle, file_type: fileType },
        sort_by: sort,
        per_page: 20,
        offset,
      },
      searchFilterProps: {
        title,
        onChangeTitle,
        fileType,
        onChangeFileType,
        sort,
        onChangeSort,
        debouncedTitle,
      },
      setOffset,
      onResetFilters,
      isChangedFilters,
    }),
    [title, fileType, sort, debouncedTitle, offset]
  );

  return memoizedValues;
};

export const useGetFiles = (payload: MediaGalleryPayload) => {
  const { setFiles } = useMediaGalleryContext();
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const api = useApi();
  const getFiles = useQuery(
    ['media-gallery', JSON.stringify(payload)],
    () => api.mediaGallery.getBy(payload),
    {
      onSuccess: (response) => {
        setIsFetching(false);
        if (response.count > payload.offset + payload.per_page) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
        setFiles(prev => ([...prev, ...response.files]));
      },
      onError: () => {
        setIsFetching(false);
      },
      staleTime: 0,
    },
  );

  return { ...getFiles, hasMore, isFetching, setIsFetching };
};
