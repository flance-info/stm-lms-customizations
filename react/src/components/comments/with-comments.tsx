import { FC } from 'react';

interface WithCommentsProps {
  isExistComments: boolean;
  children: React.ReactNode;
}

export const WithComments: FC<WithCommentsProps> = ({ isExistComments, children }) => (
  isExistComments ? <>{children}</> : null
);