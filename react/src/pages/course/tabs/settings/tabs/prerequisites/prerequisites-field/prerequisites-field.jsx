import { memo } from 'react';
import { Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import { useController } from 'react-hook-form';

import { FieldControl } from 'components/forms/field-control';
import { selectTheme, styles } from 'styles/select-styles-config';
import { usePrerequisiteFieldSearch } from './prerequisites-field-hooks';
import { useTranslate } from 'services';

export const PrerequisitesField = memo((props) => {
  const { label, name, placeholder, ...restProps } = props;
  const { inputValue, onInputChange, isLoading, options } = usePrerequisiteFieldSearch();
  const { field, fieldState } = useController({ name });
  const onChange = (option) => {
    const courses = field.value;
    const isExist = courses.some((course) => course.id === option.id);

    if (isExist) {
      const filteredCourses = courses.filter((item) => item.id !== option.id);
      field.onChange(filteredCourses);
    } else {
      field.onChange([...courses, option]);
    }
  };

  const { __ } = useTranslate();
  const NO_OPTIONS_MESSAGE = __('Sorry, no matching options.');

  return (
    <FieldControl label={label} name={name}>
      <Flex>
        <ReactSelect
          value=""
          {...restProps}
          placeholder={placeholder}
          options={options}
          isLoading={isLoading}
          inputValue={inputValue}
          noOptionsMessage={() => NO_OPTIONS_MESSAGE}
          onChange={onChange}
          onInputChange={onInputChange}
          styles={styles({ error: !!fieldState.error })}
          theme={selectTheme}
          getOptionLabel={(option) => option.title}
          getOptionValue={(option) => option.id}
        />
      </Flex>
    </FieldControl>
  );
});

PrerequisitesField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};
