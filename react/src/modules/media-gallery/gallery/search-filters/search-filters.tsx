import { FC, useMemo } from 'react';
import { Flex, Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import Select from 'react-select';

import { DropdownIndicator } from '~/components/forms/fields/select-field/select/dropdown-indicator';
import { Option } from '~/models';
import { SearchFiltersProps } from './search-filters-interfaces';
import { selectTheme, styles } from '~/styles/select-styles-config';
import { useGetFileTypeOptions, useGetSortOptions } from './search-filters-hooks';
import { useTranslate } from '~/services';

import { ReactComponent as SearchIcon } from '~/assets/icons/search-icon.svg';

export const SearchFilters: FC<SearchFiltersProps> = props => {
  const { title, onChangeTitle, onChangeSort, sort, onChangeFileType, fileType, enableFilters } = props;
  const { __ } = useTranslate();
  const fileTypeOptions = useGetFileTypeOptions();
  const sortOptions = useGetSortOptions();
  const fileTypeValue = useMemo(() => {
    return fileTypeOptions.filter(option => option.id === fileType);
  }, [fileType]);

  const sortValue = useMemo(() => {
    return sortOptions.filter(option => option.id === sort);
  }, [sort]);

  return (
    <Flex justify="space-between">
      <InputGroup maxWidth="300px">
        <Input
          variant="msVariant"
          placeholder={__('Search')}
          onChange={onChangeTitle}
          value={title}
          pr="35px"
        />
        <InputRightElement>
          <Icon as={SearchIcon} fill="dark50"/>
        </InputRightElement>
      </InputGroup>
      <Flex gap='10px' minWidth={ !enableFilters ? '200px' : '410px' }>
        {(
          enableFilters
          &&
            <Select
                name="sort"
                options={fileTypeOptions}
                placeholder={__( 'Files' )}
                isSearchable={false}
                onChange={onChangeFileType}
                getOptionValue={( option: Option ) => option.id.toString()}
                value={fileTypeValue}
                styles={styles( { variant: 'material' } )}
                theme={selectTheme}
                components={{ DropdownIndicator }}
            />
          )}

        <Select
          name="fileType"
          options={sortOptions}
          placeholder={__('Sort')}
          isSearchable={false}
          onChange={onChangeSort}
          getOptionValue={(option: Option) => option.id.toString()}
          value={sortValue}
          styles={styles({ variant: 'material' })}
          theme={selectTheme}
          components={{ DropdownIndicator }}
        />
      </Flex>
    </Flex>
  );
};
