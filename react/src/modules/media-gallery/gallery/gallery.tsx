import { FC, memo, UIEvent, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { FileUploader } from './file-uploader';
import { SearchFilters } from './search-filters';
import { SearchResults } from './search-results';
import { NotFound } from './search-results/not-found';
import { Skeleton } from './skeleton';
import { useGetFiles, useSearchFilters } from './gallery-hooks';
import { useInvalidate } from '~/common/hooks';
import { useMediaGalleryContext } from '../media-gallery-context';

interface GalleryProps {
  fileType?: string;
}
export const Gallery: FC<GalleryProps> = memo(({ fileType = 'all' }) => {
  const enableFilters = fileType === 'all';
  const { payload, setOffset, searchFilterProps, onResetFilters, isChangedFilters } = useSearchFilters( fileType);
  const { isLoading, hasMore, isFetching, setIsFetching } = useGetFiles(payload);
  const { files, setFiles } = useMediaGalleryContext();
  const invalidate = useInvalidate(['media-gallery', JSON.stringify(payload)]);

  useEffect(() => {
    setIsFetching(true);
    invalidate();
    setFiles([]);
  }, [payload.filter.search, payload.filter.file_type, payload.sort_by]);

  useEffect(() => {
    invalidate();
  }, [payload.offset]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setOffset(prev => prev + 20);
    }
  };

  const onScroll = (e: UIEvent<HTMLElement>) => {
    // @ts-ignore
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      loadMore();
    }
  };

  return (
    <>
      <FileUploader resetFilters={onResetFilters} isChangedFilters={isChangedFilters}/>
      <Flex flexDirection="column" gap="20px">
        <SearchFilters {...searchFilterProps} enableFilters={enableFilters} />
        <Box h="410px" overflowY="auto" onScroll={onScroll}>
          {isFetching ? <Skeleton size={20}/> : !files.length ? <NotFound/> : <SearchResults files={files} />}
        </Box>
      </Flex>
    </>
  );
});
