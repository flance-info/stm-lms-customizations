import { FC } from 'react';

import { FieldsByDrip } from './fields-by-drip';
import { EditorField, SwitchField } from '~/components/forms/fields';
import { useTranslate } from '~/services';

export const CommonFields: FC = () => {
  const { __ } = useTranslate();
  return (
    <>
      <SwitchField name="preview" label={__('Lesson preview (Everyone can see this lesson)')} />
      <FieldsByDrip />
      <EditorField
        name="excerpt"
        label={__('Short description of the lesson')}
        height="100px"
      />
    </>
  );
};
