import { setLocale } from 'yup';
import { APPLICATION_DOMAIN, defaultI18n } from '~/services/i18n-provider';

const useYupLocale = () => {
  const { __ } = defaultI18n;

  setLocale({
    mixed: {
      required: __('This field is required', APPLICATION_DOMAIN),
    },
    array: {
      min: __('This field must have at least 1 item', APPLICATION_DOMAIN),
    },
  });
};

useYupLocale();
