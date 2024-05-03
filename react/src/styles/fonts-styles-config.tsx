import React from 'react';
import { Global } from '@emotion/react';

const styles = `
    @font-face {
        font-family: 'Eudoxus Sans Medium';
        font-style: normal;
        font-size: 14px;
        font-weight: 500;
        font-display: block;
        src: url(https://stijndv.com/fonts/EudoxusSans-Medium.woff2) format("woff2"),
            url(https://stijndv.com/fonts/EudoxusSans-Medium.woff) format("woff");
    }
`;

export const Fonts = () => <Global styles={styles} />;

export const fontSizes = {
  xxs: '10px',
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '24px',
};

export const fontWeights = {
  hairline: 100,
  thin: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
};

export const lineHeights = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '24px',
  xxl: '30px',
};
