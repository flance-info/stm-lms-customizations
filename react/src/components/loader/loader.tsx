import { FC } from 'react';
import { AbsoluteCenter, Spinner } from '@chakra-ui/react';

interface LoaderProps {
  isCenter?: boolean;
}

export const Loader: FC<LoaderProps> = ({ isCenter = true }) => (
  isCenter
    ? <AbsoluteCenter alignItems="center">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary" size="xl"/>
      </AbsoluteCenter>
    : <Spinner thickness="3px" speed="0.65s" emptyColor="gray.200" color="primary" size="sm"/>
);
