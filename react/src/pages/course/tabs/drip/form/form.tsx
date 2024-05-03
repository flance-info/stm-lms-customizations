import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import isEmpty from 'lodash/isEmpty';

import { Content } from './content';
import { deepEqual } from '~/helpers/form';
import { FormProps, FormValues } from './form-interfaces';
import { Prompt, useBlockerFunction } from '~/components/prompt';
import { useUpdateDrip } from './form-hooks';

export const Form: FC<FormProps> = ({ courseId, sections, materials, drip }) => {
  const isEmptyDrip = isEmpty(drip[0].materials);

  const formProps = useForm<FormValues>({
    defaultValues: { dependencies: isEmptyDrip ? [] : drip },
  });

  const { reset, watch, formState: { defaultValues } } = formProps;
  const isDirty = !deepEqual(defaultValues, watch());
  const blockingFunction = useBlockerFunction(isDirty);

  const dependencies = watch('dependencies', []);
  const isExistDependencies = !!dependencies.length;

  const { mutate, isLoading } = useUpdateDrip(courseId);

  const onSaveDripHandler = async (values: FormValues) => {
    await mutate({ id: courseId, drip: values.dependencies });
    reset(values);
  };

  return (
      <FormProvider {...formProps}>
        {isDirty && <Prompt when={blockingFunction}/>}
        <form onSubmit={formProps.handleSubmit(onSaveDripHandler)} style={{ flexGrow: 1 }}>
          <Content
            showContent={!isEmptyDrip || isExistDependencies}
            materials={materials}
            sections={sections}
            isLoading={isLoading}
            isDisabled={!isDirty}
          />
        </form>
      </FormProvider>
  );
};
