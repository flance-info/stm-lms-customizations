import { FC } from 'react';

import { DropFileLoaderField, TextField } from '~/components/forms/fields';
import { useTranslate } from '~/services';

interface ExternalProps {
  videoType?: string;
}
export const ExternalLink:FC<ExternalProps> = ({ videoType }) => {
  const { __ } = useTranslate();

  let labelVideoPoster = __( 'Lesson video poster' );
  if ('question' === videoType) {
    labelVideoPoster = __( 'Poster for question video' );
  }

  return (
    <>
      <TextField
        name="external_url"
        label={__('External Link')}
        placeholder={__('Enter external link URL')}
      />
      <DropFileLoaderField
        name="video_poster"
        label={__(labelVideoPoster)}
        type="image"
      />
    </>
  );
};
