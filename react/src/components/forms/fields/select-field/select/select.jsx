import { memo, useCallback } from 'react';
import ReactSelect from 'react-select';

import { DropdownIndicator } from './dropdown-indicator';
import { selectTheme, styles } from 'styles/select-styles-config';

export const Select = memo((props) => {
  const {
    options,
    value,
    size,
    variant,
    onChange,
    withBorder,
    error,
    optionLabel = 'label',
    menuPortalTarget,
    ...otherProps
  } = props;
  const selectValue = () => {
    return value ? options.find((option) => option.id === value) : null;
  };

  const onChangeHandler = useCallback((option) => {
    if (!option) {
      onChange(null);
    } else {
      onChange(option.id);
    }
  }, []);

  return (
    <ReactSelect
      {...otherProps}
      options={options}
      onChange={onChangeHandler}
      getOptionValue={(option) => option.id}
      getOptionLabel={(option) => option[optionLabel]}
      menuPortalTarget={menuPortalTarget}
      value={selectValue()}
      styles={styles({ size, variant, withBorder, error })}
      theme={selectTheme}
      components={{ DropdownIndicator }}
    />
  );
});
