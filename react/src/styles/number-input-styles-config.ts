import { defineStyleConfig } from '@chakra-ui/react';

export const NumberInput = defineStyleConfig({
  variants: {
    msVariant: {
      field: {
        fontSize: 'sm',
        border: '1px solid',
        borderColor: 'border',
        borderRadius: '4px',
        padding: '10px 20px 10px 20px',
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
    },
    withStepper: {
      field: {
        fontSize: 'sm',
        border: '1px solid',
        borderColor: 'border',
        borderRadius: '4px',
        padding: '10px 40px 10px 20px',
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
      stepperGroup: {
        padding: '3px',
        margin: '0px',
        width: '40px',
      },
      stepper: {
        color: 'dark50',
        background: 'secondaryBg',
        padding: '5px 3px 3px',
        border: 'none',
        '& > svg': {
          width: '100%',
          height: '0.8em',
        },
      },
    },
  },
});
