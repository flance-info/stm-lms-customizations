import React from 'react';
import { Accept } from 'react-dropzone';
import { Image, Text } from '@chakra-ui/react';

import { DropzoneType } from './dropzone-interfaces';
import { Media } from '~/models';
import { VideoPreview } from '~/components/video-preview/video-preview';

export const ACCEPT_BY_TYPE: {
  [key in DropzoneType]: Accept;
} = {
  video: {
    'video/mp4': [],
  },
  image: {
    'image/jpeg': [],
    'image/png': [],
  },
  default: {},
};

export const PREVIEW_BY_TYPE: {
  [key in DropzoneType]: React.FC<{ media: Media }>;
} = {
  image: ({ media }) => <Image
    h="100%"
    alt={media.title}
    src={media.url}
    sx={{
      overflow: 'hidden',
      objectPosition: '50% 50%',
      objectFit: 'cover',
    }}
  />,
  video: ({ media }) => <VideoPreview h="100%" alt={media.title} src={media.url} />,
  default: ({ media }) => <Text>{media.url.split('/').pop()}</Text>,
};
