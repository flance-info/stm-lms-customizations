import { FC, memo } from 'react';
import { Divider } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useOutletContext, useParams } from 'react-router-dom';

import { CourseMaterialsFormValues } from './course-materials-interfaces';
import { deepEqual } from '~/helpers/form';
import { Footer } from '~/components/footer';
import { FormWrapper } from '~/components/form-wrapper';
import { MaterialsField } from '~/components/forms/fields/materials-field';
import { Prompt, useBlockerFunction } from '~/components/prompt';
import { Settings } from '~/models';
import { TabContentBlock } from '~/components/tab-content-block';
import { TabHeader } from '~/components/tab-header';
import { useTranslate } from '~/services';
import { useUpdateCourseMaterials } from './course-materials-hooks';

export const CourseMaterialsTab: FC = memo(() => {
  const { courseId } = useParams<{ courseId: string }>();
  if (!courseId) return null;

  const { course } = useOutletContext<Settings>();
  const { __ } = useTranslate();

  const formProps = useForm<CourseMaterialsFormValues>({
    defaultValues: { files: course.files },
  });

  const isDirty = !deepEqual(formProps.formState.defaultValues, formProps.watch());
  const blockingFunction = useBlockerFunction(isDirty);
  const { isLoading, onUpdateCourseMaterials } = useUpdateCourseMaterials(courseId, formProps.reset);

  return (
    <FormProvider {...formProps}>
      {isDirty && <Prompt when={blockingFunction}/>}
      <form onSubmit={formProps.handleSubmit(onUpdateCourseMaterials)}>
        <FormWrapper>
          <TabHeader text={__('Course files')} />
          <TabContentBlock>
            <MaterialsField name="files" label={__('Course files')} />
          </TabContentBlock>
          <Divider variant="msVariant" />
          <Footer isLoading={isLoading} isDisabled={!isDirty}/>
        </FormWrapper>
      </form>
    </FormProvider>
  );
});
