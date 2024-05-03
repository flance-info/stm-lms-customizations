import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { EditLessonFormProps } from './interfaces';
import { deepEqual, scrollToError } from '~/helpers/form';
import { FormContent } from '../form-content';
import { Lesson } from '~/models';
import { LESSON_FORM_BY_TYPE } from '~/components/lessons/lesson-constants';
import { Prompt, useBlockerFunction } from '~/components/prompt';
import { useCustomFieldsConfig, useEditLessonValidation } from '~/common/hooks';
import { useUpdateLesson } from './hooks';

export const EditLessonForm: FC<EditLessonFormProps> = ({ lesson, fields }) => {
  const { validationFields } = LESSON_FORM_BY_TYPE[lesson.type];
  const {
    defaultValues: defaultCustomFields,
    validationFields: validationCustomFields,
  } = useCustomFieldsConfig(fields);
  const validation = useEditLessonValidation({
    lessonFields: validationFields,
    customFields: validationCustomFields,
  });

  const formProps = useForm<Lesson>({
    defaultValues: { ...lesson, custom_fields: defaultCustomFields },
    mode: 'onTouched',
    resolver: validation,
  });

  const { formState: { defaultValues }, watch, reset } = formProps;
  const isDirty = !deepEqual(defaultValues, watch());
  const { onUpdateLesson, isLoading } = useUpdateLesson(reset);
  const blockingFunction = useBlockerFunction(isDirty);

  return (
    <FormProvider {...formProps}>
      {isDirty && <Prompt when={blockingFunction}/>}
      <form onSubmit={formProps.handleSubmit(onUpdateLesson, scrollToError)} style={{ flexGrow: 1 }}>
        <FormContent type={lesson.type} isLoading={isLoading} fields={fields} isDisabled={!isDirty} />
      </form>
    </FormProvider>
  );
};
