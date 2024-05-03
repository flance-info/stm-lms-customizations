import React, { FC } from 'react';
import { Divider } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import omit from 'lodash/omit';
import { useOutletContext, useParams } from 'react-router-dom';
import parse from 'html-react-parser';

import { CustomField } from '~/components/forms/fields';
import { CustomFormValues, Settings } from '~/models';
import { Footer } from '~/components/footer';
import { FormWrapper } from '~/components/form-wrapper';
import { scrollToError } from '~/helpers/form';
import { TabContentBlock } from '~/components/tab-content-block';
import { TabHeader } from '~/components/tab-header';
import { useCustomFieldsConfig } from '~/common/hooks';
import { useTranslate } from '~/services';
import { useCustomFieldsValidation, useUpdateCustomFields } from './custom-fields-hooks';

export const CustomFieldsTab: FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  if (!courseId) return null;

  const { custom_fields } = useOutletContext<Settings>();
  const { defaultValues, validationFields } = useCustomFieldsConfig(custom_fields);
  const customFieldsValidation = useCustomFieldsValidation(validationFields);

  const formProps = useForm<CustomFormValues>({
    defaultValues,
    mode: 'onTouched',
    resolver: customFieldsValidation,
  });

  const { onUpdateCustomFields, isLoading } = useUpdateCustomFields(courseId);
  const { __ } = useTranslate();

  return (
    <FormProvider {...formProps}>
      <form onSubmit={formProps.handleSubmit(onUpdateCustomFields, scrollToError)}>
        <FormWrapper>
          <TabHeader text={__('Custom fields')} />
          <TabContentBlock>
            {custom_fields.map((field => {
              const customFieldProps = omit(field, ['value', 'required']);
              return (
                <React.Fragment key={field.name}>
                  <CustomField {...customFieldProps}/>
                  {field.custom_html && parse(field.custom_html)}
                </React.Fragment>
              );
            }))}
          </TabContentBlock>
          <Divider variant="msVariant" />
          <Footer isLoading={isLoading}/>
        </FormWrapper>
      </form>
    </FormProvider>
  );
};
