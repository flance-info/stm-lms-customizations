import { FC } from 'react';

import { TextField } from '~/components/forms/fields';
import { useTranslate } from '~/services';

export const Youtube: FC = () => {
  const { __ } = useTranslate();
  return (
    <TextField
      name="youtube_url"
      label={__('Youtube video URL')}
      placeholder={__('Enter YouTube video URL')}
    />
  );
};