import { FC } from 'react';
import { AbsoluteCenter } from '@chakra-ui/react';

import { EmptyView } from '~/components/empty-view';
import { EMPTY_VIEW_TYPE } from '~/common/constants';
import { useTranslate } from '~/services';

interface FallbackProps {
  message?: string;
}

export const Fallback: FC<FallbackProps> = ({ message }) => {
  const { __ } = useTranslate();

  return (
    <AbsoluteCenter>
      <EmptyView
        type={EMPTY_VIEW_TYPE.ERROR}
        errorMessage={message || __('Something went wrong!')}
      />
    </AbsoluteCenter>
  );
};
