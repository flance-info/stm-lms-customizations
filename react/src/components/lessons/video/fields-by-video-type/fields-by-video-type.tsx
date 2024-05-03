import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { Html } from './html';
import { ExternalLink } from './external-link';

import { FIELDS_BY_TYPE } from './fields-by-video-type-constants';
import { VideoLesson } from '~/models';

interface FieldsByVideoTypeProps {
  videoType: string;
}
export const FieldsByVideoType: FC<FieldsByVideoTypeProps> = ({ videoType }) => {
  const { watch } = useFormContext<VideoLesson>();
  const type = watch('video_type');
  if('html' === type) {
    return <Html videoType={videoType} />;
  }
  else if ('ext_link' === type) {
    return <ExternalLink videoType={videoType} />;
  } else {
    return type ? FIELDS_BY_TYPE[type] : null;
  }
};
