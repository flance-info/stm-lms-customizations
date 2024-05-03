import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import { deepEqual, scrollToError } from '~/helpers/form';
import { Exams, GoogleMeet } from '~/models';
import { Form } from '../form';
import { GOOGLE_MEET_DEFAULT_VALUES } from '~/common/constants';
import { Prompt, useBlockerFunction } from '~/components/prompt';
import { useCreateGoogleMeet } from './hooks';
import { validationSchema } from '~/components/google-meet';

interface CreateGoogleMeetFormProps {
  type: Exams.GOOGLE_MEET;
}

export const CreateGoogleMeetForm: FC<CreateGoogleMeetFormProps> = ({ type }) => {
  const formProps = useForm<GoogleMeet>({
    defaultValues: GOOGLE_MEET_DEFAULT_VALUES,
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const { formState: { defaultValues }, watch, reset } = formProps;
  const isDirty = !deepEqual(defaultValues, watch());
  const blockingFunction = useBlockerFunction(isDirty);
  const { onCreateGoogleMeet, isLoading } = useCreateGoogleMeet(reset);

  return (
    <FormProvider {...formProps}>
      {isDirty && <Prompt when={blockingFunction}/>}
      <form onSubmit={formProps.handleSubmit(onCreateGoogleMeet, scrollToError)} style={{ flexGrow: 1 }}>
        <Form type={type} isLoading={isLoading} isDisabled={!isDirty}/>
      </form>
    </FormProvider>
  );
};
