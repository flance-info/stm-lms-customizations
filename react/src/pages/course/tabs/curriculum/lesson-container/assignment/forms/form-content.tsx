import { FC } from 'react';
import { Divider } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { Content } from '~/components/assignments';
import { Exams } from '~/models';
import { Footer } from '~/components/footer';
import { Header } from '../../components/header';
import { useTranslate } from '~/services';

interface FormContentProps {
  type: Exams.ASSIGNMENT;
  isLoading: boolean;
  isDisabled?: boolean;
}

export const FormContent: FC<FormContentProps> = ({ type, isLoading, isDisabled }) => {
  const { __ } = useTranslate();
  const { watch } = useFormContext();
  const id = watch('id', undefined);
  const label = !id ? __('Create') : __('Save');

  return (
    <>
      <Header
        type={type}
        placeholder={__('Enter assignment name')}
        label={label}
        isLoading={isLoading}
        isDisabled={isDisabled}
      />
      <Content/>
      <Divider variant="msVariant" />
      <Footer label={label} sticky isLoading={isLoading} background="white" isDisabled={isDisabled}/>
    </>
  );
};
