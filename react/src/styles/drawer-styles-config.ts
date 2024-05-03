import { defineStyleConfig } from '@chakra-ui/react';

export const Drawer = defineStyleConfig({
  variants: {
    default: {
      dialog: {
        maxWidth: '416px',
        bg: 'secondaryBg',
      },
      header: {
        size: 'xl',
        fontWeight: 'light',
      },
      closeButton: {
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        bg: 'border',
        top: '24px',
        right: '30px',
        color: 'dark50',
        '&:hover': {
          color: 'border',
          bg: 'dark50',
        },
        '& svg': {
          width: '10px',
          height: '10px',
        }
      }
    },
  },
  defaultProps: {
    variant: 'default',
  },
});
