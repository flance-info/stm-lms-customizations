import { FC, memo, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { CustomField, ServerError } from '~/models';
import { deepEqual, scrollToError } from '~/helpers/form';
import { Form } from './form';
import { FormWrapper } from '../../components/form-wrapper';
import { QuizModel } from '~/services/resources/quiz/quiz';
import { TOAST_STATUS } from '~/common/constants';
import { Prompt, useBlockerFunction } from '~/components/prompt';
import { useApi, useTranslate } from '~/services';
import { useCourse } from '../../../../../course-page-hooks';
import {
  useCustomFieldsConfig,
  useEditLessonValidation,
  useErrorToastOptions,
  useInvalidateLesson,
  useLessonPageType,
} from '~/common/hooks';
import { useToast } from '~/components/toast';

interface FormContainerProps {
  defaultValues: QuizModel;
  fields: CustomField[];
}

export const FormContainer: FC<FormContainerProps> = memo(({ defaultValues, fields }) => {
  const { defaultValues: custom_fields, validationFields } = useCustomFieldsConfig(fields);
  const validation = useEditLessonValidation({
    lessonFields: ['title'],
    customFields: validationFields,
  });
  const toast = useToast();
  const { __ } = useTranslate();
  const api = useApi();

  const formProps = useForm<any>({
    defaultValues: { ...defaultValues, custom_fields },
    mode: 'onTouched',
    resolver: validation,
  });

  const { watch, reset } = formProps;
  const isDirty = !deepEqual({ ...defaultValues, custom_fields }, watch());

  const blockingFunction = useBlockerFunction(isDirty);

  useEffect(() => {
    formProps.reset({ ...defaultValues, custom_fields });
  }, [JSON.stringify(defaultValues)]);

  const invalidateLesson = useInvalidateLesson('quiz');
  const { isSingleLessonPage } = useLessonPageType();
  const { invalidate: invalidateCurriculum } = useCourse();

  const { mutate, isLoading } = useMutation((payload: QuizModel) => {
    return api.quiz.update(payload);
  }, {
    onSuccess: async () => {
      await invalidateLesson();
      if (!isSingleLessonPage) {
        await invalidateCurriculum();
      }
      toast({ message: __('Quiz successfully saved'), type: TOAST_STATUS.SUCCESS });
    },
    onError: (error: ServerError) => {
      const errorToastOptions = useErrorToastOptions(error, __('Failed to save quiz'));
      toast(errorToastOptions);
    },
  });

  const onSaveQuiz = async (data: QuizModel) => {
    await mutate(data);
    reset(data);
  };

  const EditForm = (
    <form onSubmit={formProps.handleSubmit(onSaveQuiz, scrollToError)}>
      {isDirty && <Prompt when={blockingFunction}/>}
      <Form isLoading={isLoading} fields={fields} isDisabled={!isDirty}/>
    </form>
  );

  return (
    <FormProvider {...formProps}>
      {isSingleLessonPage
        ? EditForm
        : <FormWrapper>{EditForm}</FormWrapper>
      }
    </FormProvider>
  );
});
