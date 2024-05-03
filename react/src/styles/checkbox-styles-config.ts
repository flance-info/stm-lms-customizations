import { defineStyleConfig } from '@chakra-ui/react';

export const Checkbox = defineStyleConfig({
  baseStyle: {
    control: {
      width: '20px',
      height: '20px',
      borderRadius: '4px',
      _disabled: {
        pointerEvents: 'none',
      },
      _checked: {
        bg: 'primary',
        color: 'white',
        borderColor: 'primary',
        _hover: {
          bg: 'primaryHover',
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
    icon: {
      animation: 'none',
    }
  },
});
