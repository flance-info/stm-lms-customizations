import { I18n } from '@wordpress/i18n';

export type LmsApiSettings = {
  dashboardUrl: string;
  lmsUrl: string;
  wpUrl: string;
  nonce: string;
};
export type ExtendedI18n = I18n & {
  sprintf: (locale: string, ...args: any[]) => string;
};

declare global {
  interface Window {
    lmsApiSettings: LmsApiSettings;
    wp: {
      i18n: ExtendedI18n;
    };
  }
}

window.lmsApiSettings = window.lmsApiSettings || {};

export {};
