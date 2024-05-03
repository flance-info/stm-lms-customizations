import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import { CreateLessonFormProps } from './interfaces';
import { deepEqual, scrollToError } from '~/helpers/form';
import { FormContent } from '../form-content';
import { LESSON_DEFAULT_VALUES_BY_TYPE } from '~/common/constants';
import { LESSON_FORM_BY_TYPE } from '~/components/lessons/lesson-constants';
import { NewLesson } from '~/models';
import { Prompt, useBlockerFunction } from '~/components/prompt';
import { useCreateLesson } from './hooks';

export const CreateLessonForm: FC<CreateLessonFormProps> = ({ type }) => {
  const { validationSchema } = LESSON_FORM_BY_TYPE[type];

  const formProps = useForm<NewLesson>({
    defaultValues: { ...LESSON_DEFAULT_VALUES_BY_TYPE[type], type },
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const { formState: { defaultValues }, watch, reset } = formProps;
  const isDirty = !deepEqual(defaultValues, watch());
  const blockingFunction = useBlockerFunction(isDirty);

  const { onCreateLesson, isLoading } = useCreateLesson(reset);

  return (
    <FormProvider {...formProps}>
      {isDirty && <Prompt when={blockingFunction}/>}
      <form onSubmit={formProps.handleSubmit(onCreateLesson, scrollToError)} style={{ flexGrow: 1 }}>
        <FormContent type={type} isLoading={isLoading} isDisabled={!isDirty}/>
      </form>
    </FormProvider>
  );
};
