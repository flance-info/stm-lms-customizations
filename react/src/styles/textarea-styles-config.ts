import { defineStyleConfig } from '@chakra-ui/react';

export const Textarea = defineStyleConfig({
  variants: {
    msVariant: {
      fontSize: 'sm',
      border: '1px solid',
      borderColor: 'border',
      borderRadius: '4px',
      padding: '10px 20px',
      _focus: {
        borderColor: 'primary',
      },
      _invalid: {
        borderColor: 'error',
      },
      _placeholder: {
        color: 'dark50',
      },
    },
    unstyled: {
      color: 'dark70',
      fontSize: 'sm',
    },
  },
});
