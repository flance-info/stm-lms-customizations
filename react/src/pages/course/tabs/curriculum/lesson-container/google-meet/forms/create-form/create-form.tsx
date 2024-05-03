import { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import { deepEqual, scrollToError } from '~/helpers/form';
import { Exams, GoogleMeet } from '~/models';
import { FormContent } from '../form-content';
import { FormWrapper } from '../../../components/form-wrapper';
import { GOOGLE_MEET_DEFAULT_VALUES } from '~/common/constants';
import { Prompt, useBlockerFunction } from '~/components/prompt';
import { useCreateGoogleMeet } from './hooks';
import { useCurriculumContext } from '../../../../curriculum-tab-context';
import { validationSchema } from '~/components/google-meet';

interface CreateGoogleMeetFormProps {
  type: Exams.GOOGLE_MEET;
  sectionId: string;
}

export const CreateGoogleMeetForm: FC<CreateGoogleMeetFormProps> = ({ sectionId, type }) => {
  const formProps = useForm<GoogleMeet>({
    defaultValues: GOOGLE_MEET_DEFAULT_VALUES,
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const { formState: { defaultValues }, watch, reset } = formProps;
  const isDirty = !deepEqual(defaultValues, watch());
  const blockingFunction = useBlockerFunction(isDirty);
  const { onCreateGoogleMeet, isLoading } = useCreateGoogleMeet(sectionId, type, reset);

  const { setNewMaterial } = useCurriculumContext();
  const title = watch('title', '');

  useEffect(() => {
    setNewMaterial({ title, type });
    return () => setNewMaterial(null);
  }, [title]);

  return (
    <FormProvider {...formProps}>
      {isDirty && <Prompt when={blockingFunction}/>}
      <FormWrapper>
        <form onSubmit={formProps.handleSubmit(onCreateGoogleMeet, scrollToError)} style={{ width: '100%' }}>
          <FormContent type={type} isLoading={isLoading} isDisabled={!isDirty}/>
        </form>
      </FormWrapper>
    </FormProvider>
  );
};
