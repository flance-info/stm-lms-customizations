import { ReactNode, useMemo } from 'react';

export const replacePlaceholder = (str: string, regexp: RegExp): ReactNode[] => {
  const matchResult = str.match(regexp);
  if (!matchResult) return [str];

  const match = matchResult[0];
  const parts = str.split(match);
  return [parts[0], <mark key={match}>{match}</mark>, ...(parts[1] ? replacePlaceholder(parts[1], regexp) : [])];
};

export const useHighlightPlaceholder = (str: string, regexp: RegExp) => {
  return useMemo(() => replacePlaceholder(str, regexp), [str, regexp]);
};

export const getLink = (url: string, search: string) => `${url}&search=${search}`;
