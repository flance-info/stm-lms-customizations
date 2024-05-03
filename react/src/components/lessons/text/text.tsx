import { FC } from 'react';

import { TextField } from '~/components/forms/fields';
import { useTranslate } from '~/services';

export const Text: FC = () => {
  const { __ } = useTranslate();

  return (
    <TextField name="duration" label={__('Lesson duration')} placeholder={__('Enter lesson duration')}/>
  );
};
