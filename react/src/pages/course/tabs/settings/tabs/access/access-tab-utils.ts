import { Access } from '~/models';
import { AccessTabFormValues } from './access-tab-interfaces';
import { Resolver } from 'react-hook-form';
import isNil from 'lodash/isNil';

export const getAccessDataByDependencies = (values: Partial<AccessTabFormValues>) => {
  const {
    shareware,
    expiration,
    end_time,
    coming_soon_show_course_price,
    coming_soon_show_course_details,
    coming_soon_email_notification,
    coming_soon_preordering,
    coming_soon_status,
    coming_soon_message,
    coming_soon_date,
    coming_soon_time
  } = values;
  const data: Partial<Access> = { shareware, expiration };

  if (expiration) {
    data['end_time'] = end_time;
  }
  if (coming_soon_status) {
    data['coming_soon_status'] = coming_soon_status;
    data['coming_soon_show_course_price'] = coming_soon_show_course_price;
    data['coming_soon_show_course_details'] = coming_soon_show_course_details;
    data['coming_soon_email_notification'] = coming_soon_email_notification;
    data['coming_soon_preordering'] = coming_soon_preordering;
    data['coming_soon_message'] = coming_soon_message;
    data['coming_soon_date'] = coming_soon_date;
    data['coming_soon_time'] = coming_soon_time;
  }

  return data;
};

export const validateAccessTab: Resolver<AccessTabFormValues> = (values) => {
  const errors: {[key: string]: { message: string }} = {};
  const {
    coming_soon_status,
    coming_soon_date,
    coming_soon_time,
  } = values;

  if (coming_soon_status) {
    // @ts-ignore
    if (isNil(coming_soon_date) || coming_soon_date === '') {
      errors['coming_soon_date'] = { message: 'This field is required' };
    }
    if (coming_soon_time === '') {
      errors['coming_soon_time'] = { message: 'This field is required' };
    }
  }

  return { values, errors: Object.keys(errors).length === 0 ? {} : errors };
};

