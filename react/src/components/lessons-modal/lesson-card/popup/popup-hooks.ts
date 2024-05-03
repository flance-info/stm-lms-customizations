import { ELessonType, Exams, QuestionMediaTypes } from '~/models';
import { getLink } from '~/helpers/string';
import {
  getCourseBuilderSettings,
  useHasPluginsOrAddons,
} from '~/common/hooks';
import { useTranslate } from '~/services';
import { EAddon, EPlugin } from '~/common/constants';

export const useGetPopupOptions = (type: ELessonType | Exams | QuestionMediaTypes) => {
  const { __ } = useTranslate();

  const { data: { urls } } = getCourseBuilderSettings();
  const { hasAddon, hasPlugin } = useHasPluginsOrAddons();
  const isProActive = hasPlugin(EPlugin.LMS_PRO);
  const questionMediaAddon = hasAddon(EAddon.QUESTION_MEDIA);

  switch (type) {
    case Exams.ASSIGNMENT:
      return {
        title: __('Assignments addon disabled'),
        text: __('Engage and evaluate learners with interesting tasks and projects.'),
        link: getLink(urls.addons, 'Assignment'),
      };
    case Exams.GOOGLE_MEET:
      return {
        title: __('Google Meet addon disabled'),
        // eslint-disable-next-line
        text: __('Unlock the power of online meetings with interactive virtual classrooms. Experience smooth communication and collaboration with learners.'),
        link: getLink(urls.addons, 'Google+Meet'),
      };
    case ELessonType.ZOOM:
      return {
        title: __('Zoom webinar addon disabled'),
        text: __('Teach with Zoom lessons, meetings and webinars directly on your website.'),
        link: getLink(urls.addons, 'Zoom+Conference'),
      };
    case ELessonType.STREAM:
      return {
        title: __('Live Stream addon disabled'),
        text: __('Create YouTube streams from your course to conduct lectures in real time.'),
        link: getLink(urls.addons, 'Live+Streaming'),
      };
    case QuestionMediaTypes.VIDEO:
      return {
        title: !isProActive
          ? __( 'Available in Pro Version' )
          : !questionMediaAddon ? __( 'Question Media addon disabled' )
          : '',
      text: !isProActive // eslint-disable-next-line
          ? __( 'Question Media addon is available in the Pro Version of the plugin. Please, upgrade to Pro to add media to quiz questions.' ) // eslint-disable-next-line
          : !questionMediaAddon ? __( 'Question Media addon is not enabled. Please, enable this addon to add media to quiz questions.' )
          : '',
        link: getLink( urls.addons, 'Question' ),
      };
    case QuestionMediaTypes.AUDIO:
      return {
        title: !isProActive
          ? __( 'Available in Pro Version' )
          : !questionMediaAddon ? __( 'Question Media addon disabled' )
          : '',
        text: !isProActive // eslint-disable-next-line
          ? __( 'Question Media addon is available in the Pro Version of the plugin. Please, upgrade to Pro to add media to quiz questions.' ) // eslint-disable-next-line
          : !questionMediaAddon ? __( 'Question Media addon is not enabled. Please, enable this addon to add media to quiz questions.' )
          : '',
        link: getLink( urls.addons, 'Question' ),
      };
    default:
      return {
        title: __('Addon is disabled'),
        text: __('Lesson is unavailable'),
        link: urls.addons,
      };
  }
};
