import React from 'react';

// Make sure to only include the library in development
// eslint-disable-next-line
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  // eslint-disable-next-line
  const HookForm = require('react-hook-form');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackHooks: true,
    trackExtraHooks: [
      [HookForm, 'useFormContext'],
      // [Formik, 'useField'],
    ],
  });
}
