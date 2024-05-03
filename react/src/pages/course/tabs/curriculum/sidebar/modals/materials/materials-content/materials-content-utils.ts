import groupBy from 'lodash/groupBy';

import { ImportMaterials, PostType } from '~/models';

export const getMaterialsByPostType = (searchResults: ImportMaterials[], searchType?: PostType) => {
  if (searchType) {
    return { [searchType]: searchResults };
  }

  return groupBy(searchResults, 'post_type');
};
