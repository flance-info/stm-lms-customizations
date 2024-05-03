export interface PricingFormValues {
  single_sale: boolean;
  price?: number;
  sale_price?: number;
  sale_price_dates_start?: number;
  sale_price_dates_end?: number;
  enterprise_price?: number;
  not_membership: boolean;
  affiliate_course: boolean;
  affiliate_course_text: string;
  affiliate_course_link: string;
  points_price?: number;
  price_info: string;
}

export interface PricingFormProps {
  initialData: PricingFormValues;
  courseId: string;
}
