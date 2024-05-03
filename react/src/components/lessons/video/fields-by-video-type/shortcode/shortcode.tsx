import { FC } from 'react';

import { TextField } from '~/components/forms/fields';
import { useTranslate } from '~/services';

export const Shortcode: FC = () => {
  const { __ } = useTranslate();
  return <TextField name="shortcode" label={__('Shortcode')} placeholder={__('Enter shortcode')}/>;
};
