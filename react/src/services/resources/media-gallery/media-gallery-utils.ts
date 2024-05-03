import { MediaGalleryFilter } from './interfaces';

export const queryFilter = (filter: MediaGalleryFilter) => {
  let str = '';

  for (const [key, value] of Object.entries(filter)) {
    str += `filter[${key}]=${value}&`;
  }

  return str;
};
