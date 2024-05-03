import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const msVariant = defineStyle({
  borderWidth: '1px',
  borderStyle: 'solid',
  opacity: 1,
});

export const Divider = defineStyleConfig({
  variants: { msVariant },
});
