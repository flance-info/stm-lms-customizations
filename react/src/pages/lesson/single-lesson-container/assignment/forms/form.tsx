import { FC } from 'react';
import { Divider } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { Content } from '~/components/assignments';
import { Exams } from '~/models';
import { Footer } from '~/components/footer';
import { FormHeader } from '../../components/form-header';
import { FormWrapper } from '../../components/form-wrapper';
import { useTranslate } from '~/services';

interface FormProps {
  type: Exams.ASSIGNMENT;
  isLoading: boolean;
  isDisabled?: boolean;
}

export const Form: FC<FormProps> = ({ type, isLoading, isDisabled }) => {
  const { __ } = useTranslate();
  const { watch } = useFormContext();

  const id = watch('id', undefined);
  const label = !id ? __('Create') : __('Save');

  return (
    <>
      <FormHeader
        type={type}
        placeholder={__('Enter assignment name')}
        isLoading={isLoading}
        isNew={!id}
        isDisabled={isDisabled}
      />
      <FormWrapper>
        <Content/>
        <Divider h="30px" bg="mainBackground"/>
        <Footer label={label} sticky isLoading={isLoading} background="white" isDisabled={isDisabled}/>
      </FormWrapper>
    </>
  );
};
