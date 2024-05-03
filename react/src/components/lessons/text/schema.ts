import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  title: yup.string().required('This field is required'),
  content: yup.string().required('This field is required'),
});

export const validationFields = ['title', 'content'];
