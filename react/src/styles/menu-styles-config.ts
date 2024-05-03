import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { menuAnatomy } from '@chakra-ui/anatomy';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys);

const courseStatus = definePartsStyle({
  list: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
    borderRadius: '4px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
    background: '#DDDDDD',
    gap: '1px',
  },
  item: {
    padding: '11px 15px',
    _disabled: {
      color: 'dark50',
      background: 'white',
      opacity: 1,
    }
  },
  command: {
  },
});

export const Menu = defineMultiStyleConfig({
  variants: { courseStatus },
});