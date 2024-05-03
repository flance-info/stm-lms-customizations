import { Box, chakra } from '@chakra-ui/react';

export const CommentsContainer = chakra(Box, {
  baseStyle: {
    mx: '-20px',
  }
});

export const CommentsContent = chakra(Box, {
  baseStyle: {
    mx: '20px',
  }
});
