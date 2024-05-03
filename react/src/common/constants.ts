import { ELessonType } from '~/models';

export const COMMON_FIELD_WIDTH = '250px';
export const FIELD_SPACING = '20px';
export const LESSON_CONTENT_WIDTH = '570px';

export const NEW_FAQ_ITEM = { answer: '', question: '' };

export enum EAddon {
  ASSIGNMENTS = 'assignments',
  CERTIFICATE_BUILDER = 'certificate_builder',
  COURSE_BUNDLE = 'course_bundle',
  ENTERPRISE_COURSES = 'enterprise_courses',
  FORM_BUILDER = 'form_builder',
  GOOGLE_CLASSROOMS = 'google_classrooms',
  GOOGLE_MEET = 'google_meet',
  GRADEBOOK = 'gradebook',
  LIVE_STREAMS = 'live_streams',
  MEDIA_LIBRARY = 'media_library',
  MULTI_INSTRUCTORS = 'multi_instructors',
  ONLINE_TESTING = 'online_testing',
  POINT_SYSTEM = 'point_system',
  PREREQUISITE = 'prerequisite',
  SCORM = 'scorm',
  SEQUENTIAL_DRIP_CONTENT = 'sequential_drip_content',
  SHAREWARE = 'shareware',
  COMING_SOON = 'coming_soon',
  STATISTICS = 'statistics',
  UDEMY = 'udemy',
  ZOOM_CONFERENCE = 'zoom_conference',
  QUESTION_MEDIA = 'question_media',
}

export enum EPlugin {
  EROOM = 'eroom',
  PMPRO = 'pmpro',
  PRESTO_PLAYER = 'presto_player',
  LMS_PRO = 'lms_pro',
}

export enum TOAST_STATUS {
  SUCCESS = 'success',
  ERROR = 'error',
}

export const EMPTY_VIEW_TYPE = {
  ASSIGNMENT: 'ASSIGNMENT',
  CURRICULUM: 'CURRICULUM',
  DRIP: 'DRIP',
  DRIP_NO_ADDON: 'DRIP_NO_ADDON',
  DRIP_EMPTY: 'DRIP_EMPTY',
  ERROR: 'ERROR',
  FAQ: 'FAQ',
  GOOGLE_MEET: 'GOOGLE_MEET',
  NOT_FOUND_PAGE: 'NOT_FOUND_PAGE',
  Q_A: 'Q_A',
  Q_A_QUIZ: 'Q_A_QUIZ',
  Q_A_ASSIGNMENT: 'Q_A_ASSIGNMENT',
  SCORM: 'SCORM',
  STREAM: 'STREAM',
  ZOOM: 'ZOOM',
};

export const COMMON_DEFAULT_VALUES = {
  files: [],
  preview: false,
  lock_from_start: false,
  content: undefined,
  duration: undefined,
  excerpt: undefined,
  title: undefined,
};

const TEXT_LESSON = {
  ...COMMON_DEFAULT_VALUES,
};

const VIDEO_LESSON = {
  ...COMMON_DEFAULT_VALUES,
  video_type: '',
  embed_ctx: undefined,
  external_url: undefined,
  video_poster: undefined,
  video: undefined,
  video_width: undefined,
  presto_player_idx: undefined,
  shortcode: undefined,
  vimeo_url: undefined,
  youtube_url: undefined,
};

const STREAM_LESSON = {
  ...COMMON_DEFAULT_VALUES,
  stream_end_date: null,
  stream_end_time: '',
  stream_start_date: null,
  stream_start_time: '',
  stream_url: undefined,
};

const ZOOM_LESSON = {
  ...COMMON_DEFAULT_VALUES,
  zoom_conference_join_before_host: false,
  zoom_conference_host_video: false,
  zoom_conference_participants_video: false,
  zoom_conference_mute_participants: false,
  zoom_conference_enforce_login: false,
  zoom_conference_password: undefined,
  zoom_conference_start_date: null,
  zoom_conference_start_time: '',
  zoom_conference_timezone: undefined,
};

export const LESSON_DEFAULT_VALUES_BY_TYPE = {
  [ELessonType.TEXT]: TEXT_LESSON,
  [ELessonType.VIDEO]: VIDEO_LESSON,
  [ELessonType.STREAM]: STREAM_LESSON,
  [ELessonType.ZOOM]: ZOOM_LESSON,
};

export const ASSIGNMENT_DEFAULT_VALUES = {
  title: undefined,
  attempts: undefined,
  content: undefined,
};

export const GOOGLE_MEET_DEFAULT_VALUES = {
  title: undefined,
  start_date: null,
  end_date: null,
  start_time: '',
  end_time: '',
  timezone: undefined,
  summary: '',
  visibility: 'public',
  attendees: false,
};
