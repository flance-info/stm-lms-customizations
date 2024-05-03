import { FC, memo } from 'react';

import { useGetFieldValue } from '~/common/hooks';
import { WithFieldValueProps } from './with-field-value-interfaces';

export const WithFieldValue: FC<WithFieldValueProps> = memo(({ name, children }) => {
  const value = useGetFieldValue(name);

  return value ? <>{children}</> : null;
});
