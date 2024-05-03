import { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import { Assignment } from '~/models';
import { ASSIGNMENT_DEFAULT_VALUES } from '~/common/constants';
import { CreateAssignmentFormProps } from './interfaces';
import { deepEqual, scrollToError } from '~/helpers/form';
import { FormContent } from '../form-content';
import { FormWrapper } from '../../../components/form-wrapper';
import { Prompt, useBlockerFunction } from '~/components/prompt';
import { useCreateAssignment } from './hooks';
import { useCurriculumContext } from '../../../../curriculum-tab-context';
import { validationSchema } from '~/components/assignments';

export const CreateAssignmentForm: FC<CreateAssignmentFormProps> = ({ sectionId, type }) => {
  const formProps = useForm<Assignment>({
    defaultValues: { ...ASSIGNMENT_DEFAULT_VALUES },
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const { formState: { defaultValues }, watch, reset } = formProps;
  const isDirty = !deepEqual(defaultValues, watch());
  const blockingFunction = useBlockerFunction(isDirty);

  const { onCreateAssignment, isLoading } = useCreateAssignment(sectionId, type, reset);

  const { setNewMaterial } = useCurriculumContext();
  const title = formProps.watch('title', '');

  useEffect(() => {
    setNewMaterial({ title, type });
    return () => setNewMaterial(null);
  }, [title]);

  return (
    <FormProvider {...formProps}>
      {isDirty && <Prompt when={blockingFunction}/>}
      <FormWrapper>
        <form onSubmit={formProps.handleSubmit(onCreateAssignment, scrollToError)} style={{ width: '100%' }}>
          <FormContent type={type} isLoading={isLoading} isDisabled={!isDirty}/>
        </form>
      </FormWrapper>
    </FormProvider>
  );
};
