import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import { deepEqual, scrollToError } from '~/helpers/form';
import { Exams, GoogleMeet } from '~/models';
import { Form } from '../form';
import { Prompt, useBlockerFunction } from '~/components/prompt';
import { useUpdateGoogleMeet } from './hooks';
import { validationSchema } from '~/components/google-meet';

interface EditGoogleMeetFormProps {
  type: Exams.GOOGLE_MEET;
  meeting: GoogleMeet;
}

export const EditGoogleMeetForm: FC<EditGoogleMeetFormProps> = ({ type, meeting }) => {
  const formProps = useForm<GoogleMeet>({
    defaultValues: meeting,
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const { formState: { defaultValues }, watch, reset } = formProps;
  const isDirty = !deepEqual(defaultValues, watch());
  const blockingFunction = useBlockerFunction(isDirty);
  const { onUpdateGoogleMeet, isLoading } = useUpdateGoogleMeet(reset);

  return (
    <FormProvider {...formProps}>
      {isDirty && <Prompt when={blockingFunction}/>}
      <form onSubmit={formProps.handleSubmit(onUpdateGoogleMeet, scrollToError)} style={{ flexGrow: 1 }}>
        <Form type={type} isLoading={isLoading} isDisabled={!isDirty}/>
      </form>
    </FormProvider>
  );
};
