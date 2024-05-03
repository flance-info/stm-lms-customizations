import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  title: yup.string().required('This field is required'),
  stream_url: yup.string().required('This field is required'),
});

export const validationFields = ['title', 'stream_url'];
