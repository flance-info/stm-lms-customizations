import { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import { CreateLessonFormProps } from './interfaces';
import { deepEqual, scrollToError } from '~/helpers/form';
import { FormContent } from '../form-content';
import { FormWrapper } from '../../../components/form-wrapper';
import { LESSON_DEFAULT_VALUES_BY_TYPE } from '~/common/constants';
import { LESSON_FORM_BY_TYPE } from '~/components/lessons/lesson-constants';
import { NewLesson } from '~/models';
import { Prompt, useBlockerFunction } from '~/components/prompt';
import { useCreateLesson } from './hooks';
import { useCurriculumContext } from '../../../../curriculum-tab-context';

export const CreateLessonForm: FC<CreateLessonFormProps> = ({ type, sectionId }) => {
  const { validationSchema } = LESSON_FORM_BY_TYPE[type];

  const formProps = useForm<NewLesson>({
    defaultValues: { ...LESSON_DEFAULT_VALUES_BY_TYPE[type], type },
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const { setNewMaterial } = useCurriculumContext();
  const title = formProps.watch('title', '');

  useEffect(() => {
    setNewMaterial({ title, type });
    return () => setNewMaterial(null);
  }, [title]);

  const { formState: { defaultValues }, watch, reset } = formProps;
  const isDirty = !deepEqual(defaultValues, watch());
  const blockingFunction = useBlockerFunction(isDirty);
  const { onCreateLesson, isLoading } = useCreateLesson(sectionId, reset);

  return (
    <FormProvider {...formProps}>
      {isDirty && <Prompt when={blockingFunction}/>}
      <FormWrapper>
        <form onSubmit={formProps.handleSubmit(onCreateLesson, scrollToError)}>
          <FormContent type={type} isLoading={isLoading} isDisabled={!isDirty}/>
        </form>
      </FormWrapper>
    </FormProvider>
  );
};
