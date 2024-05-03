import { FC } from 'react';
import { Divider, Flex } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';

import { DatePickerField, NumberField, SwitchField, TextField } from '~/components/forms/fields';
import { deepEqual, scrollToError } from '~/helpers/form';
import { EAddon, EPlugin } from '~/common/constants';
import { FieldWrapper } from '~/components/field-wrapper';
import { Footer } from '~/components/footer';
import { FormWrapper } from '~/components/form-wrapper';
import { getLink } from '~/helpers/string';
import { PricingFormProps, PricingFormValues } from './pricing-form-interfaces';
import { Prompt, useBlockerFunction } from '~/components/prompt';
import { TabContentBlock } from '~/components/tab-content-block';
import { TabHeader } from '~/components/tab-header';
import { useCourseData, useHasPluginsOrAddons, useGetUnlockAddons, useUnlockBannerState } from 'common/hooks';
import { useTranslate } from 'services';
import { useUpdatePricing } from './pricing-form-hooks';
import { validatePricing } from './pricing-form-utils';
import { Warning } from 'components/warning';
import { WithAddon } from 'components/with-addon';
import { WithFieldValue } from 'components/with-field-value';
import { WithPlugin } from 'components/with-plugin';
import { UnlockAddons } from '~/components/unlock-addons';

export const PricingForm: FC<PricingFormProps> = ({ initialData, courseId }) => {
  const { __ } = useTranslate();
  const { hasPlugin } = useHasPluginsOrAddons();
  const { data } = useCourseData();

  const formProps = useForm<PricingFormValues>({
    defaultValues: initialData,
    mode: 'onTouched',
    resolver: validatePricing,
  });

  const isUdemyCourse = data.options.course_style === 'udemy';
  const isDirty = !deepEqual(formProps.formState.defaultValues, formProps.watch());
  const blockingFunction = useBlockerFunction(isDirty);
  const { isLoading, onUpdatePricing } = useUpdatePricing(courseId, formProps.reset);

  const addons = useGetUnlockAddons(EAddon.POINT_SYSTEM);
  const {
    isAddonEnabled: isPointSystemEnabled,
    isProActive: isPointSystemProActive
  } = useUnlockBannerState(courseId, EAddon.POINT_SYSTEM);
  const {
    isAddonEnabled: isEnterpriseCoursesEnabled,
    isProActive: isEnterpriseCoursesProActive
  } = useUnlockBannerState(courseId, EAddon.ENTERPRISE_COURSES);

  return (
    <FormProvider {...formProps}>
      {isDirty && <Prompt when={blockingFunction}/>}
      <form onSubmit={formProps.handleSubmit(onUpdatePricing, scrollToError)}>
        <FormWrapper>
          <TabHeader text={__('Pricing')} />
          <TabContentBlock>
            <SwitchField name="single_sale" label={__('One-time purchase')} />
            <WithFieldValue name="single_sale">
              <FieldWrapper>
	              <NumberField
		              name="price"
		              label={__('Price') + ` (${data.options.currency_symbol})`}
		              placeholder={__('Enter price')}
	              />
              </FieldWrapper>
              <FieldWrapper>
	              <NumberField
		              name="sale_price"
                  label={__('Sale price') + ` (${data.options.currency_symbol})`}
		              placeholder={__('Enter sale price')}
	              />
              </FieldWrapper>
              { isPointSystemProActive && (
                <Flex justify="space-between">
                  <FieldWrapper>
                    <DatePickerField name="sale_price_dates_start" label={__('Sale start date')}/>
                  </FieldWrapper>
                  <FieldWrapper>
                    <DatePickerField name="sale_price_dates_end" label={__('Sale end date')}/>
                  </FieldWrapper>
                </Flex>
              )}
            </WithFieldValue>
          </TabContentBlock>
          <Divider variant="msVariant" />
          {isEnterpriseCoursesEnabled && isEnterpriseCoursesProActive && (
             <>
            <TabContentBlock>
              <NumberField
                name="enterprise_price"
                label={__('Enterprise Price') + ` (${data.options.currency_symbol})`}
                placeholder={__('Enter price')}
              />
            </TabContentBlock>
            <Divider variant="msVariant"/>
            </>
           )}
           { isEnterpriseCoursesProActive && (
           <WithAddon
            addon={EAddon.ENTERPRISE_COURSES}
            fallback={
              <>
                <TabContentBlock>
                  <Warning
                    text={__('Group Courses addon is not enabled!')}
                    link={getLink(data.urls.addons, 'Group+Courses')}
                    title={hasPlugin(EPlugin.LMS_PRO) ? __('Enable') : __('Enable Pro')}
                  />
                </TabContentBlock>
                <Divider variant="msVariant"/>
              </>
            }
          >
          </WithAddon>
          )}
          <WithPlugin
            plugin={EPlugin.PMPRO}
            fallback={
              <>
                <TabContentBlock>
                  <Warning
                    text={__('Paid Membership Pro plugin is not installed!')}
                    link={data.urls.plugins}
                    title={__('Install')}
                  />
                </TabContentBlock>
                <Divider variant="msVariant" />
              </>
            }
          >
            <TabContentBlock>
              <SwitchField name="not_membership" label={__('Not included in membership')}/>
            </TabContentBlock>
            <Divider variant="msVariant" />
          </WithPlugin>
          { isPointSystemProActive && (
            <TabContentBlock>
              <SwitchField
                  name="affiliate_course"
                  label={__('Affiliate this course')}
                  hint={__('The user will go to the link you put instead of buying on your website.')}
              />
              <WithFieldValue name="affiliate_course">
                <TextField
                  name="affiliate_course_text"
                  label={__('Button Text')}
                  placeholder={__('Enter button text')}
                />
                <TextField
                  name="affiliate_course_link"
                  label={__('Button Link')}
                  placeholder={__('Enter button link')}
                />
              </WithFieldValue>
            </TabContentBlock>
          )}
          {isPointSystemEnabled && isPointSystemProActive && (
            <>
            <Divider variant="msVariant" />
            <TabContentBlock>
              <NumberField
                name="points_price"
                label={__('Points for a course')}
                placeholder={__('Enter points')}
              />
            </TabContentBlock>
            <Divider variant="msVariant" />
            </>
          )}
          {isPointSystemProActive && (
          <WithAddon
            addon={EAddon.POINT_SYSTEM}
            fallback={
              <>
               <Divider variant="msVariant" />
                <TabContentBlock>
                  <Warning
                    text="Point System addon is not enabled!"
                    link={getLink(data.urls.addons, 'Point+System')}
                    title={hasPlugin(EPlugin.LMS_PRO) ? __('Enable') : __('Enable Pro')}
                  />
                </TabContentBlock>
                <Divider variant="msVariant" />
              </>
            }
          >
          </WithAddon>
          )}
          {isUdemyCourse &&
              <WithPlugin plugin={EPlugin.LMS_PRO}>
                  <TabContentBlock>
                      <TextField
                          name="price_info"
                          label={__('Price info')}
                          placeholder={__('Enter price info')}
                      />
                  </TabContentBlock>
                  <Divider variant="msVariant" />
              </WithPlugin>
          }
          <Footer isLoading={isLoading} isDisabled={!isDirty}/>
        </FormWrapper>
        <UnlockAddons addons={addons} />
      </form>
    </FormProvider>
  );
};
