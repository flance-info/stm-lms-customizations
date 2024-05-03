import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { popoverAnatomy as parts } from '@chakra-ui/anatomy';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  body: {
    margin: '10px',
    color: 'primary',
  },
  closeButton: {
    color: 'primary',
  },
});

export const Popover = defineMultiStyleConfig({ baseStyle });
