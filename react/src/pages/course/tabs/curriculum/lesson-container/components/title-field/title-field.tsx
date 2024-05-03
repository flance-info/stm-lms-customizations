import { FC, memo } from 'react';
import { chakra, Flex, FormControl, Input, InputGroup, InputLeftAddon, InputRightElement } from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import omit from 'lodash/omit';

import { PrefixTitle } from '~/components/prefix-title';
import { TitleFieldProps } from './title-field-interfaces';
import { useTranslate } from '~/services';

const ErrorMessage = chakra(Flex, {
  baseStyle: {
    color: 'white',
    bg: 'error',
    fontSize: 'xs',
    h: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    padding: '5px 10px',
  },
});

export const TitleField: FC<TitleFieldProps> = memo((props) => {
  const { name, prefixType, ...otherProps } = props;
  const { field, fieldState: { error } } = useController({ name });
  const fieldProps = omit(field, 'ref');
  const { __ } = useTranslate();
  const message = error?.message === 'This field is required' ? __('This field is required') : error?.message;

  return (
    <FormControl isInvalid={!!error}>
      <InputGroup>
        <InputLeftAddon bg="border" color="dark70" p="10px" borderRadius="4px 0px 0px 4px">
          <PrefixTitle prefixType={prefixType} iconColor="dark70"/>
        </InputLeftAddon>
        <Input
          variant="msVariant"
          {...otherProps}
          {...fieldProps}
          pr={error ? '150px' : '20px'}
        />
        {error && (
          <InputRightElement p="5px" minWidth="145px">
            <ErrorMessage>{message}</ErrorMessage>
          </InputRightElement>
        )}
      </InputGroup>
    </FormControl>
  );
});
