import { defineStyleConfig } from '@chakra-ui/react';

export const Accordion = defineStyleConfig({
  variants: {
    msVariant: {
      root: {
        maxWidth: '365px',
      },
      container: {
        marginBottom: '10px',
        background: 'white',
        borderRadius: '4px',
      },
      button: {
        padding: '0px',
        width: '25px',
        height: '25px',
        _hover: {
          background: 'none',
        },
      },
      panel: {
        padding: '10px',
      },
    },
  },
});
