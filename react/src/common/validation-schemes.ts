import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  title: yup.string().required('This field is required'),
  slug: yup.string().required('This field is required'),
  category: yup.array().min(1, 'This field is required'),
});

export const createCategoryValidationScheme = yup.object().shape({
  name: yup.string().required('This field is required'),
});

export const prerequisitesValidationScheme = yup.object().shape({
  passing_level: yup.number()
    .min(1, 'The Passing Level field needs to be a numeric value, equal to, or higher than 1')
    .nullable(true),
  courses: yup.array()
    .test('The Courses field is required', 'At least one course is required if the passing level is 1 or higher',
      function (value) {
        const passingLevel = this.parent.passing_level;

        if (passingLevel >= 1 && (!value || value.length === 0)) {
          return this.createError({ message: 'The Courses field is required' });
        }

        return true;
  }),
});
