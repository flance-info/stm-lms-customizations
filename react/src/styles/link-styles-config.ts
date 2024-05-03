import { defineStyleConfig } from '@chakra-ui/react';

export const Link = defineStyleConfig({
  variants: {
    install: {
      fontWeight: 'medium',
      textDecoration: 'none',
      color: 'white !important',
      bg: 'primary',
      borderRadius: '5px',
      padding: '6px 20px',
      border: 0,
      _hover: {
        bg: 'primaryHover',
      },
    },
  },
});
