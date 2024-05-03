import { FC } from 'react';
import { FormErrorMessage } from '@chakra-ui/react';

import { useFieldState } from '~/helpers/form';
import { useTranslate } from '~/services';

interface FormErrorProps {
  name: string;
}

export const FieldError: FC<FormErrorProps> = ({ name }) => {
  const state = useFieldState(name);
  const { __ } = useTranslate();
  const { error } = state;

  if (!error) {
    return null;
  }

  const message = error === 'This field is required' ? __('This field is required') : error;

  return (
    <FormErrorMessage color="error" fontSize="xs" position="absolute" mt="3px">
      {message}
    </FormErrorMessage>
  );
};
