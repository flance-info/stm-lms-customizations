import { ChangeEvent, FC, memo, useRef, useState } from 'react';
import { Flex, FormLabel, Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import omit from 'lodash/omit';
import { useController } from 'react-hook-form';

import { FieldControl } from '~/components/forms/field-control';
import { UrlFieldProps } from './url-field-interfaces';

import { ReactComponent as EditIcon } from '~/assets/icons/edit-icon.svg';

export const UrlField: FC<UrlFieldProps> = memo(props => {
  const { name, label, prefix, isDisabled, ...otherProps } = props;

  const { field } = useController({ name });
  const fieldProps = omit(field, ['ref', 'onBlur', 'onChange']);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [disabled, setDisabled] = useState(true);

  const handleEditClick = async () => {
    await setDisabled(false);
    await inputRef.current?.focus();
  };

  const handleBlur = () => {
    field.onBlur();
    setDisabled(true);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase().replace(/\s+/g, '-');
    field.onChange(value);
  };

  const disabledInput = isDisabled || disabled;

  return (
    <FieldControl name={name}>
      <Flex gap="5px" mb="3px" alignItems="center">
        <FormLabel fontSize="xs" fontWeight="semiBold" m="0">
          {label}
        </FormLabel>
        <FormLabel fontSize="xs" fontWeight="medium" color="dark70" m="0" wordBreak="break-word">
          {prefix}{field.value}
        </FormLabel>
      </Flex>
      <InputGroup>
        <Input
          variant="msUrlField"
          ref={inputRef}
          {...otherProps}
          {...fieldProps}
          onChange={onChange}
          isDisabled={disabledInput}
          padding="10px 40px 10px 20px"
          onBlur={handleBlur}
        />
        <InputRightElement
          w="fit-content"
          h="full"
          p="0 20px 0 5px"
        >
          <Icon
            as={EditIcon}
            onClick={handleEditClick}
            cursor="pointer"
          />
        </InputRightElement>
      </InputGroup>
    </FieldControl>
  );
});
