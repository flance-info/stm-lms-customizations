import isNil from 'lodash/isNil';
import { Resolver } from 'react-hook-form';

import { PricingFormValues } from './pricing-form-interfaces';

export const validatePricing: Resolver<PricingFormValues> = (values) => {
  const errors: {[key: string]: { message: string }} = {};
  const {
    single_sale,
    price,
    affiliate_course,
    affiliate_course_text,
    affiliate_course_link,
    sale_price_dates_start,
    sale_price_dates_end,
  } = values;

  if (single_sale && isNil(price)) {
    errors['price'] = { message: 'This field is required' };
  }

  if (affiliate_course) {
    if (!affiliate_course_text) {
      errors['affiliate_course_text'] = { message: 'This field is required' };
    }

    if (!affiliate_course_link) {
      errors['affiliate_course_link'] = { message: 'This field is required' };
    }
  }

  if (sale_price_dates_start && !sale_price_dates_end) {
    errors['sale_price_dates_end'] = { message: 'This field is required' };
  }

  if (sale_price_dates_end && !sale_price_dates_start) {
    errors['sale_price_dates_start'] = { message: 'This field is required' };
  }

  if (sale_price_dates_start && sale_price_dates_end) {
    if (sale_price_dates_start > sale_price_dates_end) {
      errors['sale_price_dates_end'] = { message: 'End date must be after start date' };
    }
  }

  return { values, errors: Object.keys(errors).length === 0 ? {} : errors };
};
