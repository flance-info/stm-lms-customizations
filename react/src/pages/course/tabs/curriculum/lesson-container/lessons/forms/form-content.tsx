import { FC } from 'react';
import { Divider } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { Content } from '~/components/lessons/content';
import { Footer } from '~/components/footer';
import { FormContentProps } from './form-content-interfaces';
import { Header } from '../../components/header';
import { LESSON_FORM_BY_TYPE } from '~/components/lessons/lesson-constants';
import { useTranslate } from '~/services';

export const FormContent: FC<FormContentProps> = ({ type, isLoading, isDisabled, fields = [] }) => {
  const { form: LessonForm } = LESSON_FORM_BY_TYPE[type];

  const { __ } = useTranslate();
  const { watch } = useFormContext();
  const id = watch('id', undefined);
  const label = !id ? __('Create') : __('Save');

  return (
    <>
      <Header
        type={type}
        placeholder={__('Enter lesson name')}
        label={label}
        isLoading={isLoading}
        isDisabled={isDisabled}
      />
      <Content fields={fields}>
        <LessonForm/>
      </Content>
      <Divider variant="msVariant"/>
      <Footer label={label} sticky isLoading={isLoading} background="white" isDisabled={isDisabled}/>
    </>
  );
};