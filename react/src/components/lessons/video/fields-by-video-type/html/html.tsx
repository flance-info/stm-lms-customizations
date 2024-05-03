import { FC } from 'react';

import { DropFileLoaderField, NumberField } from '~/components/forms/fields';
import { useTranslate } from '~/services';

interface HtmlProps {
  videoType?: string;
}
export const Html: FC<HtmlProps> = ({ videoType }) => {
  const { __ } = useTranslate();
  const shouldRenderVideoWidth = videoType === 'lesson';

  let labelHtmlPoster = __( 'Lesson video poster' );
  let labelHtmlVideo = __( 'Lesson video' );
  if ('question' === videoType) {
    labelHtmlPoster = __( 'Poster for question video' );
    labelHtmlVideo = __( 'Question video' );
  }

  return (
    <>
      <DropFileLoaderField
        name="video_poster"
        label={__(labelHtmlPoster)}
        type="image"
      />
      <DropFileLoaderField name="video" label={__(labelHtmlVideo)} type="video"/>
      {shouldRenderVideoWidth && (
        <NumberField name="video_width" label={__('Video width (px)')} />
      )}
    </>
  );
};
