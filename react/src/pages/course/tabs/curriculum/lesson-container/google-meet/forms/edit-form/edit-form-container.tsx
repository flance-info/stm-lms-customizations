import { FC } from 'react';
import { useQuery } from 'react-query';
import { Exams } from '~/models';

import { EditGoogleMeetForm } from './edit-form';
import { ErrorFallback } from '~/components/error-fallback';
import { Loader } from '~/components/loader';
import { useApi } from '~/services';

interface EditGoogleMeetFormContainerProps {
  type: Exams.GOOGLE_MEET;
  lessonId: string;
}

export const EditGoogleMeetFormContainer: FC<EditGoogleMeetFormContainerProps> = ({ type, lessonId }) => {
  const api = useApi();

  const { data, isLoading, error } = useQuery(['google-meet', lessonId], ({ queryKey }) => {
      const [, id] = queryKey;
      return api.curriculum.googleMeet.getBy(id);
    },
  );

  if (isLoading) {
    return <Loader/>;
  }

  if (!data || error) {
    return <ErrorFallback/>;
  }

  return <EditGoogleMeetForm key={data.meeting.id} type={type} meeting={data.meeting}/>;
};
