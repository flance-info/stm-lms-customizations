import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys);

const msVariant = definePartsStyle({
  field: {
    fontSize: 'sm',
    border: '1px solid',
    borderColor: 'border',
    borderRadius: '4px',
    padding: '10px 20px',
    minHeight: '40px',
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
  addon: {
    border: '1px solid',
    borderRadius: '4px',
    borderColor: 'border',
    background: 'white',
    color: 'dark50',
    padding: '10px 10px 10px 20px',
    fontSize: 'sm',
  },
});

const msQuiz = definePartsStyle({
  ...msVariant,
  field: {
    height: '26px',
    border: '1px solid #DBE0E9',
    boxShadow: 'none',
    '&:focus-visible': {
      boxShadow: 'none',
    },
  },
});

const msUrlField = definePartsStyle({
  field: {
    fontSize: 'sm',
    border: '1px solid',
    borderColor: 'border',
    borderRadius: '4px',
    minHeight: '40px',
    _focus: {
      borderColor: 'primary',
    },
    _invalid: {
      borderColor: 'error',
    },
    _placeholder: {
      color: 'dark',
    },
    _disabled: {
      background: 'mainBackground',
      opacity: 1,
    },
  },
});

export const Input = defineMultiStyleConfig({
  variants: { msVariant, msQuiz, msUrlField },
});
