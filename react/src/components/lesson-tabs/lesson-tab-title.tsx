import isEmpty from 'lodash/isEmpty';
import { FC } from 'react';
import { chakra, Flex, Text } from '@chakra-ui/react';
import omit from 'lodash/omit';
import { useFormContext } from 'react-hook-form';

import { LessonTabTitleProps } from './lesson-tabs-interfaces';
import { NestedFormError } from 'models';

const Error = chakra(Flex, {
  baseStyle: {
    background: 'red',
    borderRadius: '50%',
    width: '16px',
    height: '16px',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'xxs',
  },
});

export const LessonTabTitle: FC<LessonTabTitleProps> = ({ tab }) => {
  const { formState: { errors } } = useFormContext();
  let errorsCount = 0;

  if (tab.id === 'custom_fields') {
    errorsCount = isEmpty(errors?.[tab.id]) ? 0 : Object.keys(errors[tab.id] as NestedFormError).length;
  } else {
    errorsCount = Object.keys(omit(errors, ['title', 'custom_fields'])).length;
  }

  return (
    <Flex gap="5px" alignItems="center">
      <Text color="dark70" fontSize="sm">{tab.title}</Text>
      {['lesson', 'custom_fields'].includes(tab.id) && !!errorsCount && <Error>{errorsCount}</Error>}
    </Flex>
  );
};
