import { defineStyleConfig } from '@chakra-ui/react';

export const Tabs = defineStyleConfig({
  variants: {
    quiz: {
      root: {
        width: '100%',
      },
      tablist: {
        height: '40px',
        bg: 'border',
        padding: '4px',
        borderRadius: '4px',
        width: 'fit-content',
      },
      tab: {
        height: '32px',
        padding: 0,
        margin: 0,
        color: 'dark70',
        borderRadius: '2px',
        _selected: {
          bg: 'white',
          color: 'dark',
        },
      },
      tabpanel: {
        padding: '20px 0 0',
      },
    },
  },
});
