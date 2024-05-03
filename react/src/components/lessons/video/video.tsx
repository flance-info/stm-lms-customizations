import { FC } from 'react';

import { FieldsByVideoType } from './fields-by-video-type';
import { getCourseBuilderSettings } from '~/common/hooks';
import { SelectField, TextField } from '~/components/forms/fields';
import { useTranslate } from '~/services';

export const Video: FC = () => {
  const commonData = getCourseBuilderSettings();
  const { __ } = useTranslate();

  return (
    <>
      <SelectField
        name="video_type"
        label={__('Source type')}
        options={commonData?.data?.video_sources}
        placeholder={__('Select source')}
      />
      <FieldsByVideoType videoType='lesson' />
      <TextField name="duration" label={__('Lesson duration')} placeholder={__('Enter lesson duration')} />
    </>
  );
};
