import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { deepEqual } from '~/helpers/form';
import { FaqArray } from './faq-array';
import { FaqFormProps, FaqFormValues } from './faq-form-interfaces';
import { Prompt, useBlockerFunction } from '~/components/prompt';
import { useUpdateFaq } from './faq-form-hooks';

export const FaqForm: FC<FaqFormProps> = ({ initialData, courseId }) => {
  const formProps = useForm<FaqFormValues>({
    defaultValues: initialData,
  });

  const isDirty = !deepEqual(formProps.formState.defaultValues, formProps.watch());
  const blockingFunction = useBlockerFunction(isDirty);
  const { isLoading, onUpdateFaq } = useUpdateFaq(courseId, formProps.reset);

  return (
    <FormProvider {...formProps}>
      {isDirty && <Prompt when={blockingFunction}/>}
      <form onSubmit={formProps.handleSubmit(onUpdateFaq)}>
        <FaqArray
          isLoading={isLoading}
          isExistFaq={!!initialData.faq.length}
          isDisabled={!isDirty}
        />
      </form>
    </FormProvider>
  );
};
