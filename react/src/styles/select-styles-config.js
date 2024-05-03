/**
 * @typedef {'default'|'sm'} SelectSize
 * @typedef {'default'|'with-suffix'|'material'|'category'|'option-fit'} SelectVariant
 * @typedef {boolean} WithBorder
 * @typedef {boolean} Error
 */

/**
 * @typedef StyleOptions
 * @type {object}
 * @property {SelectSize} [size]
 * @property {SelectVariant} [variant]
 * @property {WithBorder} [withBorder]
 * @property {Error} [error]
 */

const SELECT_SIZE = {
  default: '40px',
  sm: '30px',
};

const withCondition = (condition, options) => ({
  ...(condition ? options : {}),
});

/**
 *
 * @param {StyleOptions} options
 */
export const styles = (options = {}) => {
  const { size = 'default', variant = 'default', withBorder = true, error = false } = options;

  return {
    control: (controlStyles, state) => {
      const { primary, border, errorColor } = state.theme.colors;

      const newStyles = {
        ...controlStyles,
        padding: variant === 'category' ? '0px 0px 0px 5px' : '0px 0px 0px 20px',
        cursor: 'pointer',
        zIndex: 20,
        ...withCondition(size === 'sm', {
          padding: '0 5px 0 0',
        }),
        ...withCondition(variant === 'with-suffix', {
          borderRadius: '4px 0 0 4px',
        }),
        minHeight: SELECT_SIZE[size],
        height: variant === 'material' ? '40px' : undefined,
        fontFamily: 'Eudoxus Sans Medium',
        border: `1px solid ${state.isFocused ? primary : error ? errorColor : border}`,
        ...withCondition(withBorder === false, {
          border: 'none',
        }),
        boxShadow: 0,
        '&:hover': {
          border: `1px solid ${state.isFocused ? primary : error ? errorColor : border}`,
          ...withCondition(withBorder === false, {
            border: 'none',
          }),
        },
      };
      return newStyles;
    },
    valueContainer: (valueContainerStyles) => ({
      ...valueContainerStyles,
      padding: variant === 'material' ? '0px' : '4px 0',
      ...withCondition(size === 'sm', {
        padding: '0 4px',
      }),
    }),
    placeholder: (placeholderStyles, state) => {
      const { placeholder } = state.theme.colors;
      return {
        ...placeholderStyles,
        color: placeholder,
        fontFamily: 'Eudoxus Sans Medium',
        fontSize: '14px',
        fontWeight: '500',
        paddingLeft: variant === 'category' ? '16px' : '0px',
      };
    },
    indicatorsContainer: (indicatorsContainerStyles) => ({
      ...indicatorsContainerStyles,
      padding: '0 8px',
      '& *:first-of-type': {
        ...withCondition(size === 'sm', {
          padding: '4px'
        }),
      },
      '& *:last-child': {
        ...withCondition(size === 'sm', {
          padding: '0px',
        }),
        cursor: 'pointer',
      },
    }),
    input: (inputStyles, state) => {
      const { textColor } = state.theme.colors;
      return {
        ...inputStyles,
        fontFamily: 'Eudoxus Sans Medium',
        fontSize: '14px',
        fontWeight: '500',
        color: textColor,
        '& input': {
          font: 'inherit',
          color: 'red',
        },
        ...withCondition(size === 'sm', {
          margin: '0px',
        }),
      };
    },
    singleValue: (singleValueStyles, state) => {
      const { textColor } = state.theme.colors;
      return {
        ...singleValueStyles,
        color: textColor,
        fontFamily: 'Eudoxus Sans Medium',
        fontSize: '14px',
        fontWeight: '500',
      };
    },
    indicatorSeparator: () => ({
      display: 'none',
    }),
    option: (optionStyles, { isSelected }) => ({
      ...optionStyles,
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: 'normal',
      cursor: 'pointer',
      color: 'black',
      background: isSelected ? '#BDD8FF' : 'transparent',
      '&:hover': {
        background: '#BDD8FF',
      },
    }),
    multiValue: (multiValueStyles, state) => {
      const { primary } = state.theme.colors;
      return {
        ...multiValueStyles,
        background: 'white',
        border: `1px solid ${primary}`,
        padding: '1px',
        margin: '1px 4px 1px 0',
        ...withCondition(size === 'sm', {
          padding: 0,
        }),
      };
    },
    multiValueGeneric: (multiValueGenericStyles) => ({
      ...multiValueGenericStyles,
    }),
    multiValueLabel: (multiValueLabelStyles, state) => {
      const { primary } = state.theme.colors;
      return {
        ...multiValueLabelStyles,
        color: primary,
      };
    },
    multiValueRemove: (multiValueRemoveStyles, state) => {
      const { primary } = state.theme.colors;
      return {
        ...multiValueRemoveStyles,
        color: primary,
        '&:hover': {
          color: 'white',
          background: primary,
        },
      };
    },
    menu: (menuStyles) => {
      const newStyles = {
        ...menuStyles,
        zIndex: 21,
        width: variant === 'option-fit' ? '100%' : 'max-content',
        minWidth: variant === 'option-fit' ? undefined : '100%',
      };
      return newStyles;
    },
    menuPortal: (menuStyles) => {
      const newStyles = {
        ...menuStyles,
        zIndex: 21,
      };
      return newStyles;
    },
    container: (containerStyles) => {
      const newStyles = {
        ...containerStyles,
        width: '100%',
      };
      return newStyles;
    },
  };
};

export const selectTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: '#227AFF',
    border: '#DBE0E9',
    placeholder: '#4D5E6F',
    textColor: '#001931',
    errorColor: '#FF3945',
  },
});
