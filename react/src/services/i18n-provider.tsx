import { createContext, useContext, FC, ReactNode } from 'react';
import { ExtendedI18n } from '../@types/window';
export const APPLICATION_DOMAIN = 'masterstudy-lms-learning-management-system';

export { defaultI18n } from '@wordpress/i18n';
export const i18nContext = createContext<ExtendedI18n>(window.wp.i18n);
type useTranslateHook = Pick<ExtendedI18n, '__' | '_n' | '_nx' | '_x' | 'sprintf'>;
export const useTranslate = (): useTranslateHook => {
  const { __, _n, _nx, _x, sprintf } = useContext(i18nContext);

  // TODO: think how to simplify this
  return {
    __: (text, domain = APPLICATION_DOMAIN) => __(text, domain),
    _n: (single, plural, number, domain = APPLICATION_DOMAIN) => _n(single, plural, number, domain),
    _nx: (single, plural, number, context, domain = APPLICATION_DOMAIN) => _nx(single, plural, number, context, domain),
    _x: (text, context, domain = APPLICATION_DOMAIN) => _x(text, context, domain),
    sprintf,
  };
};

interface Props {
  children: ReactNode;
}

export const I18nProvider: FC<Props> = ({ children }) => {
  return <i18nContext.Provider value={window.wp.i18n}>{children}</i18nContext.Provider>;
};
