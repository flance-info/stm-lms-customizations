import { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { CreateQuizFormProps } from '../interfaces';
import { deepEqual, scrollToError } from '~/helpers/form';
import { DEFAULT_VALUES } from './constants';
import { Form } from './form';
import { FormWrapper } from '../../components/form-wrapper';
import { hookFormResolver } from './resolver';
import { Prompt, useBlockerFunction } from '~/components/prompt';
import { QuizModel } from '~/services/resources/quiz/quiz';
import { ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useCourse } from '../../../../../course-page-hooks';
import { useToast } from '~/components/toast/toast';
import { useCurriculumContext } from '../../../curriculum-tab-context';
import { useErrorToastOptions, useLessonPageType } from '~/common/hooks';
import { validationSchema } from './schema';

export const CreateQuizForm: FC<CreateQuizFormProps> = ({ type, getEditPath, sectionId }) => {
  const formProps = useForm<any>({
    defaultValues: { ...DEFAULT_VALUES },
    mode: 'onTouched',
    // TODO: fix typing
    // @ts-ignore
    resolver: hookFormResolver(validationSchema)
  });

  const { formState: { defaultValues }, watch, reset } = formProps;
  const isDirty = !deepEqual(defaultValues, watch());

  const blockingFunction = useBlockerFunction(isDirty);
  const { setNewMaterial } = useCurriculumContext();
  const title = formProps.watch('title', '');

  useEffect(() => {
    setNewMaterial({ title, type });
    return () => setNewMaterial(null);
  }, [title]);

  const navigate = useNavigate();
  const { courseId, invalidate } = useCourse();

  const api = useApi();
  const toast = useToast();
  const { __ } = useTranslate();

  const createMaterial = useMutation(api.curriculum.materials.create);

  const createLesson = useMutation(api.quiz.create, {
    onSuccess: () => {
      toast({ message: __('Quiz successfully created'), type: TOAST_STATUS.SUCCESS });
    },
    onError: (err: ServerError) => {
      const errorToastOptions = useErrorToastOptions(err, __('Failed to create quiz'));
      toast(errorToastOptions);
    },
  });
  const navigateToEditQuiz = (id: number) => {
    const path = getEditPath(id);
    navigate(path);
  };

  const onCreateQuiz = async (values: QuizModel) => {
    const response = await createLesson.mutateAsync(values);
    if (sectionId) {
      const data = { post_id: response.id, section_id: Number(sectionId) };
      await createMaterial.mutateAsync({ courseId, data });
    }
    reset(values);
    await invalidate();
    setTimeout(() => navigateToEditQuiz(response.id), 0);
  };

  const { isSingleLessonPage } = useLessonPageType();

  const CreateForm = (
    <form onSubmit={formProps.handleSubmit(onCreateQuiz, scrollToError)}>
      {isDirty && <Prompt when={blockingFunction}/>}
      <Form type={type} isLoading={createLesson.isLoading || createMaterial.isLoading} isDisabled={!isDirty}/>
    </form>
  );

  return (
    <FormProvider {...formProps}>
      {!isSingleLessonPage
        ? <FormWrapper>{CreateForm}</FormWrapper>
        : CreateForm
      }
    </FormProvider>
  );
};
