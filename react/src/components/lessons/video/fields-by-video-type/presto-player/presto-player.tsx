import { FC } from 'react';

import { getCourseBuilderSettings } from '~/common/hooks';
import { SelectField } from '~/components/forms/fields';
import { useTranslate } from '~/services';

export const PrestoPlayer: FC = () => {
  const { data } = getCourseBuilderSettings();
  const { __ } = useTranslate();
  return (
    <SelectField
      name="presto_player_idx"
      label={__('Select video')}
      options={data.presto_player_posts}
      placeholder={__('Select video')}
    />
  );
};
