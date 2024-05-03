import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { QuestionsList } from './components/questions-list';
import { useTranslate } from '~/services';
import { Warning } from '~/components/warning';

export const Questions: FC = () => {
  const { __ } = useTranslate();
  const { watch } = useFormContext();
  const id = watch('id', undefined);
  const isNew = !id;
    return (<>
      {isNew && <Warning text={__('Click on Create before adding questions to the quiz.')} mb={'10px'}><></></Warning>}
      <Box sx={{ ...(isNew ? { opacity: 0.5, pointerEvents: 'none' } : {}) }}>
        <QuestionsList name={'questions'} />
      </Box>
    </>);
};
