import { FC } from 'react';
import { useQuery } from 'react-query';

import { EAddon, EMPTY_VIEW_TYPE, EPlugin } from '~/common/constants';
import { EditAssignmentForm } from './edit-form';
import { EditAssignmentFormContainerProps } from './interfaces';
import { ErrorFallback } from '~/components/error-fallback';
import { Exams } from '~/models';
import { getCourseBuilderSettings } from '~/common/hooks';
import { Loader } from '~/components/loader';
import { NotAllowedView } from '../../../not-allowed-view';
import { useApi } from '~/services';

export const EditAssignmentFormContainer: FC<EditAssignmentFormContainerProps> = ({ type, lessonId }) => {
  const settings = getCourseBuilderSettings();
  const api = useApi();

  const { data, isLoading, error } = useQuery(['assignment', lessonId], ({ queryKey }) => {
      const [, id] = queryKey;
      return api.curriculum.assignment.getBy(id);
    },
  );

  if (settings.isLoading || isLoading) {
    return <Loader/>;
  }

  if (!data || error || settings.error || !settings.data) {
    return <ErrorFallback type={Exams.ASSIGNMENT}/>;
  }

  if (!settings.data.addons[EAddon.ASSIGNMENTS] || !settings.data.plugins[EPlugin.LMS_PRO]) {
    return <NotAllowedView type={EMPTY_VIEW_TYPE.ASSIGNMENT}/>;
  }

  return <EditAssignmentForm type={type} assignment={data.assignment}/>;
};
