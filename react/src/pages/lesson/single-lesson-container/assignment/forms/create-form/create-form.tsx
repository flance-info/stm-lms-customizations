import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import { Assignment } from '~/models';
import { ASSIGNMENT_DEFAULT_VALUES } from '~/common/constants';
import { CreateAssignmentFormProps } from './interfaces';
import { deepEqual, scrollToError } from '~/helpers/form';
import { Form } from '../form';
import { Prompt, useBlockerFunction } from '~/components/prompt';
import { useCreateAssignment } from './hooks';
import { validationSchema } from '~/components/assignments';

export const CreateAssignmentForm: FC<CreateAssignmentFormProps> = ({ type }) => {
  const formProps = useForm<Assignment>({
    defaultValues: ASSIGNMENT_DEFAULT_VALUES,
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const { formState: { defaultValues }, watch, reset } = formProps;
  const isDirty = !deepEqual(defaultValues, watch());
  const blockingFunction = useBlockerFunction(isDirty);
  const { onCreateAssignment, isLoading } = useCreateAssignment(reset);

  return (
    <FormProvider {...formProps}>
      {isDirty && <Prompt when={blockingFunction}/>}
      <form onSubmit={formProps.handleSubmit(onCreateAssignment, scrollToError)} style={{ flexGrow: 1 }}>
        <Form type={type} isLoading={isLoading} isDisabled={!isDirty}/>
      </form>
    </FormProvider>
  );
};
