export interface Category {
  id: number;
  name: string;
  parent?: number;
}

export interface UnlockAddon {
  name: string;
  img: string;
  slug: string;
}

export interface Option {
  id: string | number;
  label: string;
}

export interface Course {
  id: number;
  title: string;
}

export interface Section {
  id: number;
  title: string;
  order: number;
}

export interface Material {
  id: number;
  order: number;
  post_id: number;
  post_type: PostType;
  section_id: number;
  title: string;
  lesson_type: ELessonType;
}

export interface FaqItem {
  answer: string;
  question: string;
}

export interface Pricing {
  single_sale: boolean;
  price: number | null;
  sale_price: number | null;
  sale_price_dates_start: number;
  sale_price_dates_end: number;
  enterprise_price: number | null;
  not_membership: boolean;
  affiliate_course: boolean;
  affiliate_course_text: string;
  affiliate_course_link: string;
  points_price: number | null;
  price_info: string;
}

export interface CoInstructor {
  id: number;
  name: string;
}

export interface Settings {
  categories: Category[];
  certificates: Option[];
  course: SettingsCourse;
  levels: Option[];
  featured_quota: number;
  coming_soon: any;
  currency_symbol: string;
  custom_fields: CustomField[];
}

export type SettingsCourse = CommonSettings & Main & Access & Prerequisites & Certificate & CourseMaterials;
export interface CommonSettings {
  id: number;
}

export interface Main {
  title: string;
  slug: string;
  category: number[];
  owner: { id: number; name: string; avatar?: string } | null;
  level: string | null;
  currency_symbol: string;
  image: Media | null;
  duration_info: string | null;
  video_duration: string | null;
  co_instructor: CoInstructor | null;
  content: string | null;
  excerpt: string | null;
  status: string | null;
  status_date_start: number | null;
  status_date_end: number | null;
  views: number | null;
  current_students: number | null;
  is_featured: boolean;
  access_duration: string | null;
  access_devices: string | null;
  certificate_info: string | null;
}

export interface Access {
  shareware: boolean;
  expiration: boolean;
  end_time: number | null;
  coming_soon_show_course_price: boolean;
  coming_soon_show_course_details: boolean;
  coming_soon_email_notification: boolean;
  coming_soon_preordering: boolean;
  coming_soon_status: boolean;
  coming_soon_message: string | null;
  coming_soon_date: number | null;
  coming_soon_time: string | null;
}

export interface Prerequisites {
  prerequisites: {
    passing_level: number | null;
    courses: Course[];
  };
}

export interface Certificate {
  certificate_id: number | null;
}

export interface CourseMaterials {
  files: CourseFile[];
}

export interface CourseFile {
  id: number;
  label: string;
  type: string;
  size: number | string;
  url: string;
}

export interface BaseMedia {
  id: number;
  url: string;
}

export interface Media extends BaseMedia {
  type: string;
  title: string;
}

export enum PostType {
  STM_LESSONS = 'stm-lessons',
  STM_QUIZZES = 'stm-quizzes',
  STM_ASSIGNMENTS = 'stm-assignments',
  STM_GOOGLE_MEETS = 'stm-google-meets',
}

export interface ImportMaterials {
  author: string;
  content: string;
  excerpt: string;
  id: number;
  post_date: string;
  post_modified: string;
  post_parent: number;
  post_type: PostType;
  slug: string;
  status: string;
  title: string;
  lesson_type: ELessonType;
}

export enum ELessonType {
  STREAM = 'stream',
  TEXT = 'text',
  VIDEO = 'video',
  ZOOM = 'zoom_conference',
}

export enum Exams {
  ASSIGNMENT = 'assignment',
  GOOGLE_MEET = 'google-meet',
  QUIZ = 'quiz',
}
export enum QuestionMediaTypes {
  VIDEO = 'question-media-video',
  AUDIO = 'question-media-audio',
}

export enum VIDEO_TYPES {
  EMBED = 'embed',
  EXTERNAL_LINK = 'ext_link',
  HTML = 'html',
  PRESTO_PLAYER = 'presto_player',
  SHORTCODE = 'shortcode',
  VIMEO = 'vimeo',
  YOUTUBE = 'youtube',
}

export interface BaseLesson {
  title: string;
  type: ELessonType;
}

export interface CommonLessonValues extends BaseLesson {
  duration: string | null;
  preview: boolean;
  lock_from_start: boolean;
  start_date: number | null;
  start_time: string | null;
  lock_start_days: number | null;
  excerpt: string | null;
  content: string | null;
  files: CourseFile[];
}

// eslint-disable-next-line
export interface TextLesson extends CommonLessonValues {}

export interface VideoLesson extends CommonLessonValues {
  video_type: VIDEO_TYPES;
  embed_ctx: string | null;
  external_url: string | null;
  video_poster: Media | null;
  video: Media | null;
  video_width: number | null;
  presto_player_idx: string;
  shortcode: string | null;
  vimeo_url: string | null;
  youtube_url: string | null;
}

export interface StreamLesson extends CommonLessonValues {
  stream_url: string | null;
  stream_start_date: number | null;
  stream_end_date: number | null;
  stream_start_time: string | null;
  stream_end_time: string | null;
}

export interface ZoomLesson extends CommonLessonValues {
  zoom_conference_password: string | null;
  zoom_conference_start_date: number | null;
  zoom_conference_start_time: string | null;
  zoom_conference_timezone: string | null;
  zoom_conference_join_before_host: boolean;
  zoom_conference_host_video: boolean;
  zoom_conference_participants_video: boolean;
  zoom_conference_mute_participants: boolean;
  zoom_conference_enforce_login: boolean;
}

export interface Quiz extends BaseLesson {
  content: string;
  correct_answer: boolean;
  duration: number;
  duration_measure: string;
  excerpt: string;
  passing_grade: number;
  questions: object[],
  random_questions: boolean;
  re_take_cut: number;
  style: string;
}

export type NewLesson = TextLesson | VideoLesson | ZoomLesson | StreamLesson;
export interface Lesson extends TextLesson, VideoLesson, ZoomLesson, StreamLesson {
  id: number;
  custom_fields: CustomFormValues;
}

export interface DripItem {
  id: number;
  post_type: PostType;
  title: string;
}

export interface DripContent {
  parent: DripItem;
  // TODO: rename property to children
  childs: DripItem[];
}

export interface Assignment {
  id?: number;
  title: string;
  content: string;
  attempts: number;
  assignment_passing_grade: number;
}

export interface GoogleMeet {
  id?: number;
  title: string;
  start_date: number | null;
  end_date: number | null;
  start_time: string | null;
  end_time: string | null;
  timezone: string;
  summary: string;
  visibility: string;
  attendees: boolean;
}

export interface Comment {
  approved: string;
  author: string;
  author_avatar_url: string;
  author_email: string;
  author_url: string;
  content: string;
  date: string;
  date_gmt: string;
  id: string;
  parent: string;
  post_id: string;
  post_type: PostType;
  user_id: string;
}

export type ServerError = string | Error;

export interface QuestionCategory {
  count: number;
  description: string;
  filter: string;
  name: string;
  parent: number;
  slug: string;
  taxonomy: string;
  term_group: number;
  term_id: number;
  term_taxonomy_id: number;
}

export interface CustomField {
  value: string | null | number | boolean;
  label: string;
  name: string
  options?: Option[];
  type: string;
  required?: boolean;
  custom_html?: string;
}

export type CustomFormValues = Record<string, null | string | number | boolean>;

type FormError = { message: string };
export type NestedFormError = { [key: string]: FormError };
export type Errors = { [key: string]: FormError | NestedFormError };
