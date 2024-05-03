import { FC } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

import { MediaItem } from './media-item';
import { SearchResultsProps } from './search-results-interfaces';

export const SearchResults: FC<SearchResultsProps> = ({ files }) => {
  const columns = ['1fr', '1fr', 'repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(5, 1fr)'];

  return (
    <Grid gridTemplateColumns={columns} gap="10px" p="10px">
      {files.map(file => (
        <GridItem key={file.id} w="205px">
          <MediaItem media={file}/>
        </GridItem>
      ))}
    </Grid>
  );
};
