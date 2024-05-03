import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  title: yup.string().required('This field is required'),
  zoom_conference_password: yup.string().required('This field is required'),
  zoom_conference_start_date: yup.number().required('This field is required').nullable(true),
  zoom_conference_start_time: yup.string().required('This field is required'),
});

export const validationFields = [
  'title', 'zoom_conference_password', 'zoom_conference_start_date', 'zoom_conference_start_time'
];
