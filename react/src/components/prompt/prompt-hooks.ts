import { unstable_BlockerFunction as BlockerFunction } from 'react-router-dom';

export const useBlockerFunction = (isDirty: boolean): BlockerFunction => {
  return (args) => {
    const { currentLocation, nextLocation } = args;
    const curPath = currentLocation.pathname;
    const curPathLastEl = curPath[curPath.length - 1];
    const nextPathLastEl = curPathLastEl === '/' ? '/' : '';
    const nextPath = nextLocation.pathname + nextPathLastEl;

    return currentLocation.pathname !== nextPath && isDirty;
  };
};
