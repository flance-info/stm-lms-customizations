import ObjectSchema from 'yup/lib/object';

import { ELessonType } from '~/models';
import * as StreamLesson from './stream';
import * as TextLesson from './text';
import * as VideoLesson from './video';
import * as ZoomLesson from './zoom';

export const LESSON_FORM_BY_TYPE: {
  [type in ELessonType]: {
    form: React.ComponentType;
    // TODO: resolve typings
    validationSchema: ObjectSchema<any, any, any, any>;
    validationFields: string[];
  };
} = {
  [ELessonType.STREAM]: StreamLesson,
  [ELessonType.TEXT]: TextLesson,
  [ELessonType.VIDEO]: VideoLesson,
  [ELessonType.ZOOM]: ZoomLesson,
};
