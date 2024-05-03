import { FC, memo } from 'react';
import {
  chakra,
  Flex,
  FormControl,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
} from '@chakra-ui/react';
import omit from 'lodash/omit';
import { useController } from 'react-hook-form';

import { Exams } from '~/models';
import { PrefixTitle } from '~/components/prefix-title';
import { useTranslate } from '~/services';
import { TitleFieldProps } from './title-field-interfaces';

import { ReactComponent as PencilIcon } from '~/assets/icons/pencil-icon.svg';

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
  const { prefixType, onOpenModal, isNew, ...otherProps } = props;
  const { field, fieldState: { error } } = useController({ name: 'title' });
  const fieldProps = omit(field, 'ref');
  const { __ } = useTranslate();
  const message = error?.message === 'This field is required' ? __('This field is required') : error?.message;

  return (
    <FormControl isInvalid={!!error}>
      <InputGroup borderColor="transparent">
        <InputLeftAddon bg="dark70" color="white" p="10px" gap="10px" borderRadius="4px 0px 0px 4px">
          <PrefixTitle prefixType={prefixType} iconColor="white"/>
          {isNew && prefixType !== Exams.ASSIGNMENT && prefixType !== Exams.QUIZ && <Icon
            as={PencilIcon}
            cursor="pointer"
            onClick={(e) => {
              e.preventDefault();
              onOpenModal();
            }}
          />}
        </InputLeftAddon>
        <Input
          variant="msVariant"
          {...otherProps}
          {...fieldProps}
          bg="transparent"
          color="white"
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
