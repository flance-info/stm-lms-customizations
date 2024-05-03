import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  title: yup.string().required('This field is required'),
  start_date: yup.number().required('This field is required').nullable(true),
  end_date: yup.number().required('This field is required').nullable(true),
  start_time: yup.string().required('This field is required'),
  end_time: yup.string().required('This field is required'),
  timezone: yup.string().required('This field is required'),
  visibility: yup.string().required('This field is required'),
});
