import isNumber from 'lodash/isNumber';

import { Pricing } from '~/models';

export const getNumberFieldValue = (value: number | undefined | null) => (isNumber(value) ? value : null);

export const getPreparedPricingData = (pricing: Partial<Pricing>) => {
  const {
    single_sale,
    price,
    sale_price,
    sale_price_dates_start,
    sale_price_dates_end,
    enterprise_price,
    not_membership,
    affiliate_course,
    affiliate_course_text,
    affiliate_course_link,
    points_price,
    price_info,
  } = pricing;

  const data: Partial<Pricing> = {
    single_sale,
    affiliate_course,
    enterprise_price: getNumberFieldValue(enterprise_price),
    not_membership,
    points_price: getNumberFieldValue(points_price),
    price_info,
  };

  if (single_sale) {
    data['price'] = getNumberFieldValue(price);
    data['sale_price'] = getNumberFieldValue(sale_price);
    data['sale_price_dates_start'] = sale_price_dates_start;
    data['sale_price_dates_end'] = sale_price_dates_end;
  }

  if (affiliate_course) {
    data['affiliate_course_text'] = affiliate_course_text;
    data['affiliate_course_link'] = affiliate_course_link;
  }

  return data;
};
