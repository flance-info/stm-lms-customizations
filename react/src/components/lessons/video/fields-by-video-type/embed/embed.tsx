import { FC } from 'react';

import { TextareaField } from '~/components/forms/fields';
import { useTranslate } from '~/services';

export const Embed: FC = () => {
  const { __ } = useTranslate();
  return <TextareaField name="embed_ctx" label={__('Embed iframe content')} placeholder="Enter embed code" />;
};
