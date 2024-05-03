import { FC } from 'react';
import { Button, chakra, Flex } from '@chakra-ui/react';

import { SelectStatus } from './select-status';
import { useCourseData } from '~/common/hooks';
import { useTranslate } from '~/services';

const ControlsContainer = chakra(Flex, {
  baseStyle: {
    gap: '10px',
    padding: '0 10px',
    alignItems: 'center',
    justifySelf: 'end',
  },
});

export const Controls: FC = () => {
  const { __ } = useTranslate();
  const { data } = useCourseData();

  const viewPath = `${data.urls.courses}/${data.course.slug}`;
  const goToViewHandler = () => {
    window.open(viewPath, '_blank');
  };

  const isCoInstructor = data?.current_user_id !== Number(data?.course?.author) && data.options.is_instructor;

  return (
    <ControlsContainer>
      {!isCoInstructor && <SelectStatus/>}
      <Button
        bg="dark70"
        m="0px"
        color="white"
        onClick={goToViewHandler}
      >
        {__('View')}
      </Button>
    </ControlsContainer>
  );
};
