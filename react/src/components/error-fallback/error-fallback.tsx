import { FC } from 'react';
import { AbsoluteCenter } from '@chakra-ui/react';

import { ErrorFallbackProps } from './error-fallback-interfaces';
import { EmptyView } from '~/components/empty-view';
import { EMPTY_VIEW_TYPE } from '~/common/constants';
import { useGetPropsByLesson } from './error-fallback-hooks';
import { useTranslate } from '~/services';

export const ErrorFallback: FC<ErrorFallbackProps> = ({ message, type }) => {
  const { __ } = useTranslate();
  const propsByLesson = useGetPropsByLesson(type);

  return (
    <AbsoluteCenter>
      <EmptyView
        type={EMPTY_VIEW_TYPE.ERROR}
        errorMessage={message || __('Something went wrong!')}
        {...propsByLesson}
      />
    </AbsoluteCenter>
  );
};
