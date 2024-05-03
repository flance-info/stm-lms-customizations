import { FC, memo } from 'react';
import { Divider } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useOutletContext, useParams } from 'react-router-dom';

import { CertificateTabFormValues } from './certificate-tab-intefaces';
import { deepEqual, getInitialData } from '~/helpers/form';
import { Footer } from '~/components/footer';
import { FormWrapper } from '~/components/form-wrapper';
import { Prompt, useBlockerFunction } from '~/components/prompt';
import { SelectField } from '~/components/forms/fields';
import { Settings } from '~/models';
import { TabContentBlock } from '~/components/tab-content-block';
import { TabHeader } from '~/components/tab-header';
import { useTranslate } from '~/services';
import { useUpdateCertificate } from './certificate-tab-hooks';
import {
  useCourseData,
  useHasPluginsOrAddons,
  useUnlockBannerState,
  useGetUnlockAddons,
} from '~/common/hooks';
import { EAddon, EPlugin } from '~/common/constants';
import { WithAddon } from '~/components/with-addon';
import { Warning } from '~/components/warning';
import { getLink } from '~/helpers/string';
import { UnlockAddons } from '~/components/unlock-addons';

export const CertificateTab: FC = memo(() => {
  const { courseId } = useParams<{ courseId: string }>();
  if (!courseId) return null;

  const { __ } = useTranslate();
  const { certificates, course } = useOutletContext<Settings>();
  const initialData = getInitialData(course, ['certificate_id']);

  const formProps = useForm<CertificateTabFormValues>({
    defaultValues: initialData,
  });

  const isDirty = !deepEqual(formProps.formState.defaultValues, formProps.watch());
  const blockingFunction = useBlockerFunction(isDirty);
  const { isLoading, onUpdateCertificate } = useUpdateCertificate(courseId, formProps.reset);

  const { data } = useCourseData();
  const { hasPlugin } = useHasPluginsOrAddons();
  const { shouldRenderElements, isProActive, isAddonEnabled } = useUnlockBannerState(
      courseId,
      EAddon.CERTIFICATE_BUILDER
  );
  const addons = useGetUnlockAddons(EAddon.CERTIFICATE_BUILDER);

  return (
    <FormProvider {...formProps}>
      {isDirty && <Prompt when={blockingFunction}/>}
      <form onSubmit={formProps.handleSubmit(onUpdateCertificate)}>
      <FormWrapper
        paddingTop={(!isProActive) ? '0px' : '30px'}
        background={(!isProActive) ? 'none' : 'white'}
      >
          { isProActive && (
          <TabHeader text={ __('Certificate') } />
          )}
          {shouldRenderElements && isAddonEnabled && isProActive && (
          <>
          <TabContentBlock>
            <SelectField
              name="certificate_id"
              label={__('Select Certificate')}
              placeholder={__('Choose certificate')}
              options={certificates}
            />
          </TabContentBlock>
          <Divider variant="msVariant" />
          <Footer isLoading={isLoading} isDisabled={!isDirty}/>
          </>
          )}
          {!isAddonEnabled && isProActive && (
            <WithAddon
            addon={EAddon.CERTIFICATE_BUILDER}
            fallback={
              <>
                <TabContentBlock>
                  <Warning
                      text="Certificate Builder addon is not enabled!"
                      link={getLink(data.urls.addons, 'Certificate')}
                      title={hasPlugin(EPlugin.LMS_PRO) ? __('Enable') : __('Enable Pro')}
                  />
                </TabContentBlock>
                <Divider variant="msVariant"/>
              </>
            }
        >
        </WithAddon>
        )}
        {!isAddonEnabled && (
          <UnlockAddons addons={addons} options={true} />
        )}
        </FormWrapper>
      </form>
    </FormProvider>
  );
});
