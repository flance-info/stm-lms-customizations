import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import { Assignment } from '~/models';
import { deepEqual, scrollToError } from '~/helpers/form';
import { EditAssignmentFormProps } from './interfaces';
import { FormContent } from '../form-content';
import { FormWrapper } from '../../../components/form-wrapper';
import { Prompt, useBlockerFunction } from '~/components/prompt';
import { useUpdateAssignment } from './hooks';
import { validationSchema } from '~/components/assignments';

export const EditAssignmentForm: FC<EditAssignmentFormProps> = ({ type, assignment }) => {
  const formProps = useForm<Assignment>({
    defaultValues: { ...assignment },
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const { formState: { defaultValues }, watch, reset } = formProps;
  const isDirty = !deepEqual(defaultValues, watch());
  const blockingFunction = useBlockerFunction(isDirty);
  const { onUpdateAssignment, isLoading } = useUpdateAssignment(reset);

  return (
    <FormProvider {...formProps}>
      {isDirty && <Prompt when={blockingFunction}/>}
      <FormWrapper>
        <form onSubmit={formProps.handleSubmit(onUpdateAssignment, scrollToError)} style={{ width: '100%' }}>
          <FormContent type={type} isLoading={isLoading} isDisabled={!isDirty}/>
        </form>
      </FormWrapper>
    </FormProvider>
  );
};
