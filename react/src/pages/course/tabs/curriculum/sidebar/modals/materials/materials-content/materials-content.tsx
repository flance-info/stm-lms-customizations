import { FC } from 'react';
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
} from '@chakra-ui/react';
import Select from 'react-select';
import { useMutation } from 'react-query';

import { DropdownIndicator } from '~/components/forms/fields/select-field/select/dropdown-indicator';
import { ErrorFallback } from '~/components/error-fallback';
import { getMaterialsByPostType } from './materials-content-utils';
import { Loader } from '~/components/loader';
import { Materials } from '../materials';
import { MaterialsContentProps } from './materials-content-interfaces';
import { Option, PostType, ServerError } from '~/models';
import { styles, selectTheme } from 'styles/select-styles-config';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useCourse } from 'pages/course/course-page-hooks';
import { useErrorToastOptions } from '~/common/hooks';
import { useGetMaterialsIds, useSearchFilters } from './materials-content-hooks';
import { useToast } from '~/components/toast';
import { WithMaterials } from './with-materials';

import { ReactComponent as CrossIcon } from '~/assets/icons/cross.svg';
import { ReactComponent as SearchIcon } from '~/assets/icons/search-icon.svg';

export const MaterialsContent: FC<MaterialsContentProps> = ({ onClose, recentMaterials, section }) => {
  const { courseId, invalidate } = useCourse();
  if (!courseId) return null;
  const api = useApi();

  const { __, sprintf } = useTranslate();
  const {
    inputValue,
    onChangeInputValue,
    setInputValue,
    searchType,
    onChangeSearchType,
    searchResults,
    isLoading,
    isSuccess,
    error,
    LESSON_TYPE_OPTIONS,
  } = useSearchFilters(courseId);

  const toast = useToast();
  const { materialsIds, onChangeMaterialsIds, getIsChecked, handleCheckboxChange } = useGetMaterialsIds();

  const materials = getMaterialsByPostType(searchResults, searchType?.id);

  const importMaterials = useMutation(api.materials.post, {
    onSuccess: () => {
      invalidate();
      toast({ message: __('Materials successfully added'), type: TOAST_STATUS.SUCCESS });
      onClose();
    },
    onError: (error: ServerError) => {
      const errorToastOptions = useErrorToastOptions(error, __('Failed to add materials'));
      toast(errorToastOptions);
    },
  });

  if (error) {
    return <ErrorFallback />;
  }

  const importMaterialsHandler = () => {
    importMaterials.mutate({ courseId, material_ids: materialsIds, section_id: section.id });
  };

  const label = sprintf(
    __('Import %d materials to Section %d'),
    materialsIds.length,
    section.order
  );

  return (
    <>
      <ModalHeader>
        <Flex justify="space-between" gap="10px" alignItems="center">
          <Box w="70%">
            <InputGroup>
            <Input
              variant="msVariant"
              pr={isSuccess ? '120px' : '40px'}
              value={inputValue}
              onChange={onChangeInputValue}
              placeholder={__('Search materials')}
            />
              <InputRightElement w={isSuccess ? '120px': '40px'} gap="10px" alignItems="center">
                {isSuccess
                  ? <>
                      <Text fontWeight="medium" color="dark30" fontSize="sm">
                        {`${searchResults.length} ${__('results')}`}
                      </Text>
                      <Icon
                        as={CrossIcon}
                        cursor="pointer"
                        fill="dark50"
                        onClick={() => setInputValue('')}
                        boxSize="12px"
                      />
                    </>
                  : <Icon as={SearchIcon} fill="dark50" cursor="pointer" />
                }
              </InputRightElement>
            </InputGroup>
          </Box>
          <Box w="30%">
            <Select
              name="type"
              options={LESSON_TYPE_OPTIONS}
              placeholder={__('Type')}
              value={searchType}
              isSearchable={false}
              isClearable
              getOptionValue={(option: Option) => option.id.toString()}
              onChange={onChangeSearchType}
              styles={styles({ variant: 'material' })}
              theme={selectTheme}
              components={{ DropdownIndicator }}
            />
          </Box>
        </Flex>
      </ModalHeader>
      <ModalBody>
        {isLoading ? <Loader/> :
          <>
            <WithMaterials hasMaterials={!!materials[PostType.STM_ASSIGNMENTS]}>
              <Materials
                title={__('ASSIGNMENTS')}
                materials={materials[PostType.STM_ASSIGNMENTS]}
                onToggle={onChangeMaterialsIds}
                getIsChecked={getIsChecked}
                onChangeCheckbox={handleCheckboxChange}
              />
            </WithMaterials>
            <WithMaterials hasMaterials={!!materials[PostType.STM_LESSONS]}>
              <Materials
                title={__('LESSONS')}
                materials={materials[PostType.STM_LESSONS]}
                onToggle={onChangeMaterialsIds}
                getIsChecked={getIsChecked}
                onChangeCheckbox={handleCheckboxChange}
              />
            </WithMaterials>
            <WithMaterials hasMaterials={!!materials[PostType.STM_QUIZZES]}>
              <Materials
                title={__('QUIZZES')}
                materials={materials[PostType.STM_QUIZZES]}
                onToggle={onChangeMaterialsIds}
                getIsChecked={getIsChecked}
                onChangeCheckbox={handleCheckboxChange}
              />
            </WithMaterials>
            <Materials
              title={__('RECENT MATERIALS')}
              materials={recentMaterials}
              onToggle={onChangeMaterialsIds}
              getIsChecked={getIsChecked}
              onChangeCheckbox={handleCheckboxChange}
            />
          </>
        }
      </ModalBody>
      <ModalFooter>
        <Button variant="outline" m="0" w="270px" onClick={onClose}>
          {__('Cancel')}
        </Button>
        <Button
          m="0"
          w="270px"
          variant="primary"
          onClick={importMaterialsHandler}
          isLoading={importMaterials.isLoading}
          isDisabled={!materialsIds.length}
        >
          {label}
        </Button>
      </ModalFooter>
    </>
  );
};
