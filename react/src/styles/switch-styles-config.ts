import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    marginRight: '5px',
    paddingTop: '1px',
  },
  track: {
    _checked: {
      bg: 'primary',
    },
  },
});

export const Switch = defineMultiStyleConfig({ baseStyle });
