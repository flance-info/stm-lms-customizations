import { FC } from 'react';

import { TextField } from '~/components/forms/fields';
import { useTranslate } from '~/services';

export const Vimeo: FC = () => {
  const { __ } = useTranslate();
  return (
    <TextField
      name="vimeo_url"
      label={__('Vimeo video URL')}
      placeholder={__('Enter Vimeo video URL')}
    />
  );
};
