import { defineStyleConfig } from '@chakra-ui/react';

export const Progress = defineStyleConfig({
  variants: {
    msVariant: {
      track: {
        borderRadius: '5px !important',
        margin: '6px 0 0 !important',
      },
      filledTrack: {
        bg: 'primary',
      },
    },
  },
});
