import isUndefined from 'lodash/isUndefined';
import pickBy from 'lodash/pickBy';
import { getNumberFieldValue } from '~/helpers/data';

import { ELessonType, Lesson } from '~/models';

export const getPreparedLessonData = (lesson: Partial<Lesson>) => {
  const {
    type,
    lock_from_start,
    lock_start_days,
    start_date,
    start_time,
    video_type,
    video_poster,
    video,
    video_width,
    youtube_url,
    vimeo_url,
    external_url,
    embed_ctx,
    shortcode,
    presto_player_idx,
    files,
    ...otherValues
  } = lesson;

  const result: Record<string, any> = { ...otherValues, type, lock_from_start };

  if (type === ELessonType.VIDEO) {
    result['video_type'] = video_type;
    if (video_type === 'html') {
      result['video_poster'] = video_poster?.id ?? null;
      result['video'] = video?.id ?? null;
      result['video_width'] = getNumberFieldValue(video_width);
    } else if (video_type === 'youtube') {
      result['youtube_url'] = youtube_url;
    } else if (video_type === 'vimeo') {
      result['vimeo_url'] = vimeo_url;
    } else if (video_type === 'ext_link') {
      result['external_url'] = external_url;
      result['video_poster'] = video_poster?.id ?? null;
    } else if (video_type === 'embed') {
      result['embed_ctx'] = embed_ctx;
    } else if (video_type === 'shortcode') {
      result['shortcode'] = shortcode;
    } else if (video_type === 'presto_player') {
      result['presto_player_idx'] = presto_player_idx;
      result['video_poster'] = video_poster?.id ?? null;
    }
  }

  result['files'] = files?.map((file) => ({ id: file.id, label: file.label }));

  if (lock_from_start) {
    result['lock_start_days'] = lock_start_days;
  } else {
    result['start_date'] = start_date;
    result['start_time'] = start_time || null;
  }

  const { custom_fields } = result;
  for (const key in custom_fields) {
    if (isUndefined(custom_fields[key])) {
      custom_fields[key] = '';
    }
  }

  return pickBy(result, value => !isUndefined(value));
};
