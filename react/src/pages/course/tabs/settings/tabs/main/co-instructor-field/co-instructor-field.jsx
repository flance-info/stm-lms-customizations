import { memo } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import { useController } from 'react-hook-form';

import { DropdownIndicator } from '~/components/forms/fields/select-field/select/dropdown-indicator';
import { FieldControl } from 'components/forms/field-control';
import { Option, SingleValue } from './components';
import { selectTheme, styles } from 'styles/select-styles-config';
import { useGetCoInstructorHook } from './co-instructor-field-hooks';
import { useTranslate } from '~/services';

export const CoInstructorField = memo(({ name, label, ...otherProps }) => {
  const { field } = useController({ name });
  const { selectedOption, onChange, inputValue, onInputChange, options, isLoading } = useGetCoInstructorHook(
    field.value,
    field.onChange,
  );
  const { __ } = useTranslate();

  return (
    <FieldControl label={label} name={name}>
      <ReactSelect
        {...otherProps}
        options={options}
        isLoading={isLoading}
        inputValue={inputValue}
        onInputChange={onInputChange}
        onChange={onChange}
        value={selectedOption}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.id}
        noOptionsMessage={() => __('No options')}
        loadingMessage={() => __('Loading')}
        styles={styles({ variant: 'category' })}
        theme={selectTheme}
        components={{ DropdownIndicator, Option, SingleValue }}
      />
    </FieldControl>
  );
});

CoInstructorField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};
