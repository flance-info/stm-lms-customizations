import { defineStyleConfig } from '@chakra-ui/react';

export const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: 'medium',
    textTransform: 'none',
    borderRadius: '5px',
    border: 0,
    margin: '10px',
    height: 0,
    lineHeight: '18px',
    _disabled: {
      pointerEvents: 'none',
      opacity: 0.3,
    },
  },
  sizes: {
    tiny: {
      px: '10px',
      py: '6px',
    },
    smallx: {
      px: '10px',
      py: '7px',
      height: '30px',
      fontSize: '12px',
      borderRadius: '15px',
    },
    small: {
      px: '20px',
      py: '11px',
      height: '40px',
    },
    large: {
      px: '24px',
      py: '16px',
      height: '50px',
    },
  },
  variants: {
    default: {
      color: 'primary',
      bg: 'default',
      _hover: {
        color: 'secondaryBg',
        bg: 'primary',
      },
    },
    primary: {
      color: 'white',
      bg: 'primary',
      _hover: {
        bg: 'primaryHover',
      },
    },
    green: {
      color: 'white',
      bg: '#19C895',
      _hover: {
        bg: '#14a178',
      },
    },
    secondary: {
      color: 'secondary',
      bg: 'secondaryBg',
      _hover: {
        color: 'secondaryHover',
      },
    },
    'secondary-dark': {
      color: 'white',
      bg: 'secondary',
      _hover: {
        bg: 'dark50',
        color: 'white',
      },
    },
    outline: {
      color: 'primary',
      bg: 'outlineBg',
      border: '1px solid',
      borderColor: 'primary',
      _hover: {
        color: 'secondaryBg',
        bg: 'primary',
      },
    },
    success: {
      color: 'white',
      bg: 'success',
      _hover: {
        bg: 'successHover',
      },
    },
    error: {
      color: 'white',
      bg: 'error',
      _hover: {
        bg: 'errorHover',
      },
    },
    warning: {
      color: 'white',
      bg: 'warning',
      _hover: {
        bg: 'warningHover',
      },
    },
    materials: {
      color: 'dark70',
      bg: 'rgba(77, 94, 111, 0.1)',
      _hover: {
        color: 'white',
        bg: 'dark50',
      },
    },
    round: {
      borderRadius: 21,
    },
  },
  defaultProps: {
    size: 'small',
    variant: 'default',
  },
});
