import { FC, memo } from 'react';
import { Flex } from '@chakra-ui/react';
import Select from 'react-select';

import { Category } from '~/models';
import { CategoryModal } from './category-modal';
import { DropdownIndicator } from '../select-field/select/dropdown-indicator';
import { FieldControl } from '~/components/forms/field-control';
import { getCategoriesGroupedByParents } from './select-category-helpers';
import { Option } from './option';
import { SelectCategoryFieldProps } from './select-category-field-interfaces';
import { selectTheme, styles } from 'styles/select-styles-config';
import { useApi, useTranslate } from '~/services';
import { useSelectCategoryFieldHook } from './select-category-field-hooks';

export const SelectCategoryField: FC<SelectCategoryFieldProps> = memo((props) => {
  const api = useApi();
  const { __ } = useTranslate();
  const {
    label,
    name,
    placeholder,
    categories,
    size,
    variant = 'category',
    withBorder,
    menuPortalTarget,
    createCategoryCallback = api.categories.create,
    isAllowedCreateCategory = false,
    queryKey,
  } = props;

  const { onChangeHandler, getValue, onCategoryCreated, error }
    = useSelectCategoryFieldHook(name, categories);

  const NOT_FOUND = __('Not found');

  return (
    <FieldControl label={label} name={name}>
      <Flex gap="10px" alignItems="center">
        <Select
          isMulti
          name={name}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          noOptionsMessage={() => NOT_FOUND}
          options={getCategoriesGroupedByParents(categories)}
          placeholder={placeholder}
          menuPortalTarget={menuPortalTarget}
          value={getValue()}
          /*@ts-ignore*/
          onChange={onChangeHandler}
          /*@ts-ignore*/
          getOptionValue={(option: Category) => option.id}
          getOptionLabel={(option: Category) => option.name}
          /*@ts-ignore*/
          components={{ Option, DropdownIndicator }}
          styles={styles({ size, variant, withBorder, error })}
          theme={selectTheme}
        />
        {isAllowedCreateCategory && (
          <CategoryModal
            size={size}
            onCategoryCreated={onCategoryCreated}
            createCategoryCallback={createCategoryCallback}
            categories={getCategoriesGroupedByParents(categories)}
            queryKey={queryKey}
          />
        )}
      </Flex>
    </FieldControl>
  );
});
