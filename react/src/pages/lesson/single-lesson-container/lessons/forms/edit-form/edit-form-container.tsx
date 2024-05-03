import { FC } from 'react';
import { useQuery } from 'react-query';

import { EAddon, EMPTY_VIEW_TYPE, EPlugin } from '~/common/constants';
import { EditLessonFormContainerProps } from './interfaces';
import { EditLessonForm } from './edit-form';
import { ELessonType } from '~/models';
import { ErrorFallback } from '~/components/error-fallback';
import { getCourseBuilderSettings } from '~/common/hooks';
import { Loader } from '~/components/loader';
import { NotAllowedView } from '../../../not-allowed-view';
import { useApi } from '~/services';

export const EditLessonFormContainer: FC<EditLessonFormContainerProps> = ({ lessonId }) => {
  const api = useApi();

  const settings = getCourseBuilderSettings();

  const getLesson = useQuery(['lesson', lessonId], ({ queryKey }) => {
      const [, id] = queryKey;
      return api.curriculum.lessons.getBy(id);
    },
  );

  if (getLesson.isLoading || settings.isLoading) {
    return <Loader />;
  }

  if (getLesson.error || settings.error || !getLesson.data || !settings.data) {
    return <ErrorFallback type={ELessonType.TEXT}/>;
  }

  if (getLesson.data.lesson.type === ELessonType.ZOOM
    && (!settings.data.addons[EAddon.ZOOM_CONFERENCE] || !settings.data.plugins[EPlugin.LMS_PRO])
  ) {
    return <NotAllowedView type={EMPTY_VIEW_TYPE.ZOOM}/>;
  }

  if (getLesson.data.lesson.type === ELessonType.STREAM
    && (!settings.data.addons[EAddon.LIVE_STREAMS] || !settings.data.plugins[EPlugin.LMS_PRO])
  ) {
    return <NotAllowedView type={EMPTY_VIEW_TYPE.STREAM}/>;
  }

  return (
    <EditLessonForm
      key={getLesson.data.lesson.id}
      lesson={getLesson.data.lesson}
      fields={getLesson.data.custom_fields}
    />
  );
};
