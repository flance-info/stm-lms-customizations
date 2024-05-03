import { FC } from 'react';
import { Divider } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';

import { deepEqual } from '~/helpers/form';
import { EditorField } from '~/components/forms/fields';
import { Footer } from 'components/footer';
import { FormProps, FormValues } from './form-intefaces';
import { FormWrapper } from '~/components/form-wrapper';
import { Prompt, useBlockerFunction } from '~/components/prompt';
import { TabContentBlock } from '~/components/tab-content-block';
import { TabHeader } from '~/components/tab-header';
import { useTranslate } from '~/services';
import { useUpdateNotice } from './form-hooks';

export const Form: FC<FormProps> = ({ initialData, courseId }) => {
  const { __ } = useTranslate();

  const formProps = useForm<FormValues>({
    defaultValues: initialData,
  });

  const isDirty = !deepEqual(formProps.formState.defaultValues, formProps.watch());
  const blockingFunction = useBlockerFunction(isDirty);
  const { isLoading, onUpdateNotice } = useUpdateNotice(courseId, formProps.reset);

  return (
    <FormProvider {...formProps}>
      {isDirty && <Prompt when={blockingFunction}/>}
      <form onSubmit={formProps.handleSubmit(onUpdateNotice)}>
        <FormWrapper w="970px" flexDirection="column">
          <TabHeader text={__('Notice')} />
          <TabContentBlock>
            <EditorField name="announcement" />
          </TabContentBlock>
          <Divider variant="msVariant" />
          <Footer isLoading={isLoading} isDisabled={!isDirty}/>
        </FormWrapper>
      </form>
    </FormProvider>
  );
};
