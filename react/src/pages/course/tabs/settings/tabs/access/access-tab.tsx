import { FC, memo } from 'react';
import { Divider } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useOutletContext, useParams } from 'react-router-dom';

import { AccessTabFormValues } from './access-tab-interfaces';
import { deepEqual, getInitialData } from '~/helpers/form';
import { EAddon, EPlugin } from '~/common/constants';
import { Footer } from '~/components/footer';
import { FormWrapper } from '~/components/form-wrapper';
import { getLink } from '~/helpers/string';
import { DatePickerField, NumberField, SwitchField, TextField, TimePickerField } from '~/components/forms/fields';
import { Prompt, useBlockerFunction } from '~/components/prompt';
import { Settings } from '~/models';
import { TabContentBlock } from '~/components/tab-content-block';
import { TabHeader } from '~/components/tab-header';
import { useCourseData, useHasPluginsOrAddons, useUnlockBannerState, useGetUnlockAddons } from '~/common/hooks';
import { useTranslate } from '~/services';
import { useUpdateAccess } from './access-tab-hooks';
import { Warning } from '~/components/warning';
import { WithAddon } from '~/components/with-addon';
import { WithFieldValue } from '~/components/with-field-value';
import { UnlockAddons } from '~/components/unlock-addons';
import { validateAccessTab } from './access-tab-utils';

export const AccessTab: FC = memo(() => {
  const { courseId } = useParams<{ courseId: string }>();
  if (!courseId) return null;

  const { __ } = useTranslate();
  const { hasPlugin } = useHasPluginsOrAddons();
  const { data } = useCourseData();
  const { course } = useOutletContext<Settings>();

  const { coming_soon } = useOutletContext<Settings>();
  const accessTabInitialData = {
    ...getInitialData(course, ['access_status', 'shareware', 'expiration', 'end_time']),
    ...getInitialData(coming_soon, [
      'coming_soon_show_course_price',
      'coming_soon_show_course_details',
      'coming_soon_email_notification',
      'coming_soon_preordering',
      'coming_soon_time',
      'coming_soon_date',
      'coming_soon_message',
      'coming_soon_status',
      'coming_soon_settings'
    ]),
  };

  if (!accessTabInitialData.coming_soon_message) {
    accessTabInitialData.coming_soon_message = __( 'This course will be available soon' );
  }
  const isInstructor = data.options.is_instructor;
  const comingSoonAllowStatus = coming_soon.coming_soon_settings?.['lms_coming_soon_instructor_allow_status'] || false;
  const comingSoonPreordering = coming_soon.coming_soon_settings?.['lms_coming_soon_pre_ordering_status'] || false;
  const formProps = useForm<AccessTabFormValues>({
    defaultValues: accessTabInitialData,
    mode: 'onTouched',
    resolver: validateAccessTab,
  });

  const isDirty = !deepEqual(formProps.formState.defaultValues, formProps.watch());
  const blockingFunction = useBlockerFunction(isDirty);
  const { isLoading, onUpdateAccess } = useUpdateAccess(courseId, formProps.reset);

  const addons = useGetUnlockAddons(EAddon.SHAREWARE);
  const {
    shouldRenderElements,
    isProActive,
    isAddonEnabled
  } = useUnlockBannerState(courseId, EAddon.SHAREWARE);
  const {
    isProActive: isProActiveComingSoon,
  } = useUnlockBannerState(courseId, EAddon.COMING_SOON);

  return (
    <FormProvider {...formProps}>
      {isDirty && <Prompt when={blockingFunction}/>}
      <form onSubmit={formProps.handleSubmit(onUpdateAccess)}>
        <FormWrapper>
          <TabHeader text="Access" />
          {shouldRenderElements && isProActive && (
          <WithAddon
            addon={EAddon.SHAREWARE}
            fallback={
              <>
                <TabContentBlock>
                  <Warning
                    text="Trial Courses addon is not enabled!"
                    link={getLink(data.urls.addons, 'Trial+Courses')}
                    title={hasPlugin(EPlugin.LMS_PRO) ? __('Enable') : __('Enable Pro')}
                  />
                </TabContentBlock>
                <Divider variant="msVariant"/>
              </>
            }
          >
            <TabContentBlock>
              <SwitchField name="shareware" label={__('Trial course')}/>
            </TabContentBlock>
            <Divider variant="msVariant"/>
          </WithAddon>
           )}
          <>
          <TabContentBlock>
            <SwitchField name="expiration" label={__('Time limit')} />
            <WithFieldValue name="expiration">
              <NumberField name="end_time" label={__('Course expiration (days)')} placeholder={__('Enter days')} />
            </WithFieldValue>
          </TabContentBlock>
          <Divider variant="msVariant" />
          </>
          { isProActiveComingSoon && (
          <WithAddon
            addon={EAddon.COMING_SOON}
            fallback={
              <>
                <TabContentBlock>
                  <Warning
                    text="Upcoming course status addon is not enabled!"
                    link={getLink(data.urls.addons, 'Upcoming+Course+Status')}
                    title={hasPlugin(EPlugin.LMS_PRO) ? __('Enable') : __('Enable Pro')}
                  />
                </TabContentBlock>
                <Divider variant="msVariant"/>
              </>
            }
          >
            {( comingSoonAllowStatus || !isInstructor ) &&
              (
              <>
              <TabContentBlock>
                <SwitchField name="coming_soon_status" label={__('Upcoming Course Status')} />
                <WithFieldValue name="coming_soon_status">
                  <TextField name="coming_soon_message"
                             label={__('Notification text about upcoming courses')}
                             placeholder={__('Enter message text about upcoming course')}
                  />
                  <DatePickerField name="coming_soon_date" label={__('Coming soon end date')} />
                  <TimePickerField name="coming_soon_time" label={__('Coming soon end time')} />
                  {comingSoonPreordering && (
                    <SwitchField
                      name="coming_soon_preordering"
                      label={__('Allow preordering')}
                      hint={__('The Show course price setting must be enabled for preordering to work')}
                    />
                  )}
                  <SwitchField name="coming_soon_email_notification" label={__('Allow email notifications')} />
                  <SwitchField
                    name="coming_soon_show_course_details"
                    label={__('Show course author, category and rating')}
                    hint={
                    __('Students will see the course category and instructor information for the upcoming course.')
                  }
                  />
                  <SwitchField
                    name="coming_soon_show_course_price"
                    label={__('Show course price')}
                  />
                </WithFieldValue>

              </TabContentBlock>
              <Divider variant="msVariant"/>
            </>
            )}
          </WithAddon>
           )}
          <Footer isLoading={isLoading} isDisabled={!isDirty}/>
        </FormWrapper>

        {!isAddonEnabled && (
          <UnlockAddons addons={addons} />
        )}
      </form>
    </FormProvider>
  );
});
