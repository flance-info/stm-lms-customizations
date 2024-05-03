import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box } from '@chakra-ui/react';

import { EmptyView } from '~/components/empty-view';
import { Comments } from '~/components/comments';
import { EMPTY_VIEW_TYPE } from '~/common/constants';

export const Qa: FC = () => {
  const { watch } = useFormContext();
  const id = watch('id', undefined);
  const isNew = !id;
  const newAssignmentPropsStyles = isNew ? { display: 'flex', alignItems: 'center' } : null;

  return <Box minHeight='50vh' {...newAssignmentPropsStyles}>{isNew
    ? <EmptyView type={EMPTY_VIEW_TYPE.Q_A_QUIZ} />
    : <Comments />}</Box>;
};
