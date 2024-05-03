import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { radioAnatomy } from '@chakra-ui/anatomy';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(radioAnatomy.keys);

const msVariant = definePartsStyle({
  control: {
    width: '20px',
    height: '20px',
    _disabled: {
      pointerEvents: 'none',
    },
    _checked: {
      bg: 'white',
      color: 'primary',
      borderColor: 'primary',
      _hover: {
        color: 'white',
        bg: 'primary',
        borderColor: 'primary',
      },
    },
    _hover: {
      borderColor: 'primary',
    },
    _invalid: {
      borderColor: 'error',
    },
  },
});

export const Radio = defineMultiStyleConfig({ variants: { msVariant } });
