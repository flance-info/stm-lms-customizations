import { FC } from 'react';
import { useQuery } from 'react-query';

import { EAddon, EMPTY_VIEW_TYPE, EPlugin } from '~/common/constants';
import { EditGoogleMeetForm } from './edit-form';
import { ErrorFallback } from '~/components/error-fallback';
import { Exams } from '~/models';
import { getCourseBuilderSettings } from '~/common/hooks';
import { Loader } from '~/components/loader';
import { NotAllowedView } from '../../../not-allowed-view';
import { useApi } from '~/services';

interface EditGoogleMeetFormContainerProps {
  type: Exams.GOOGLE_MEET;
  lessonId: string;
}

export const EditGoogleMeetFormContainer: FC<EditGoogleMeetFormContainerProps> = ({ type, lessonId }) => {
  const settings = getCourseBuilderSettings();
  const api = useApi();

  const { data, isLoading, error } = useQuery(['google-meet', lessonId], ({ queryKey }) => {
      const [, id] = queryKey;
      return api.curriculum.googleMeet.getBy(id);
    },
  );

  if (settings.isLoading || isLoading) {
    return <Loader/>;
  }

  if (!data || error || settings.error || !settings.data) {
    return <ErrorFallback type={Exams.GOOGLE_MEET}/>;
  }

  if (!settings.data.addons[EAddon.GOOGLE_MEET] || !settings.data.plugins[EPlugin.LMS_PRO]) {
    return <NotAllowedView type={EMPTY_VIEW_TYPE.GOOGLE_MEET}/>;
  }

  return <EditGoogleMeetForm type={type} meeting={data.meeting}/>;
};
