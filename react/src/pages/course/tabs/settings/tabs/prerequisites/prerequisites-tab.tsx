import { FC, memo } from 'react';
import { Divider } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useOutletContext, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import { deepEqual, getInitialData, scrollToError } from '~/helpers/form';
import { Footer } from '~/components/footer';
import { FormWrapper } from '~/components/form-wrapper';
import { NumberField } from '~/components/forms/fields';
import { PrerequisitesCard } from './prerequisites-card';
import { PrerequisitesField } from './prerequisites-field';
import { PrerequisitesTabFormValues } from './prerequisites-tab-interfaces';
import { prerequisitesValidationScheme } from '~/common/validation-schemes';
import { Prompt, useBlockerFunction } from '~/components/prompt';
import { Settings } from '~/models';
import { TabContentBlock } from '~/components/tab-content-block';
import { TabHeader } from '~/components/tab-header';
import { useTranslate } from '~/services';
import { useUpdatePrerequisites } from './prerequisites-tab-hooks';
import { useCourseData, useHasPluginsOrAddons, useUnlockBannerState, useGetUnlockAddons } from '~/common/hooks';
import { EAddon, EPlugin } from '~/common/constants';
import { UnlockAddons } from '~/components/unlock-addons';
import { WithAddon } from '~/components/with-addon';
import { Warning } from '~/components/warning';
import { getLink } from '~/helpers/string';

export const PrerequisitesTab: FC = memo(() => {
  const { courseId } = useParams<{ courseId: string }>();
  if (!courseId) return null;

  const { __ } = useTranslate();
  const { course } = useOutletContext<Settings>();
  const initialData = getInitialData(course.prerequisites, ['passing_level', 'courses']);

  const formProps = useForm<PrerequisitesTabFormValues>({
    defaultValues: initialData,
    mode: 'onTouched',
    resolver: yupResolver(prerequisitesValidationScheme),
  });

  const isDirty = !deepEqual(formProps.formState.defaultValues, formProps.watch());
  const blockingFunction = useBlockerFunction(isDirty);
  const { isLoading, onUpdatePrerequisites } = useUpdatePrerequisites(courseId, formProps.reset);

  const { data } = useCourseData();
  const { hasPlugin } = useHasPluginsOrAddons();
  const { isProActive, isAddonEnabled } = useUnlockBannerState(courseId, EAddon.PREREQUISITE);
  const addons = useGetUnlockAddons(EAddon.PREREQUISITE);
  
  return (
      <FormProvider {...formProps}>
      {isDirty && <Prompt when={blockingFunction}/>}
      <form onSubmit={formProps.handleSubmit(onUpdatePrerequisites, scrollToError)}>
      <FormWrapper
        paddingTop={(!isProActive) ? '0px' : '30px'}
        background={(!isProActive) ? 'none' : 'white'}
      >
        { isProActive && (
        <TabHeader text={ __('Prerequisites') } />
        )}
        { isAddonEnabled && isProActive && (
        <>
        <TabContentBlock>
          <NumberField
            name="passing_level"
            label={__('Prerequisite Passing Percent (%)')}
            placeholder={__('Enter %')}
          />
          <PrerequisitesField
            /*@ts-ignore*/
            name="courses"
            label={__('Courses')}
            placeholder={__('Start Typing...')}
          />
          <PrerequisitesCard name="courses" />
        </TabContentBlock>
        <Divider variant="msVariant" />
        <Footer isLoading={isLoading} isDisabled={!isDirty}/>
        </>
        )}
        {!isAddonEnabled && isProActive && (
          <WithAddon
              addon={EAddon.PREREQUISITE}
              fallback={
                <>
                  <TabContentBlock>
                    <Warning
                        text="Prerequisites addon is not enabled!"
                        link={getLink(data.urls.addons, 'Prerequisites')}
                        title={hasPlugin(EPlugin.LMS_PRO) ? __('Enable') : __('Enable Pro')}
                    />
                  </TabContentBlock>
                  <Divider variant="msVariant"/>
                </>
              }>
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