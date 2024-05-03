import { FC } from 'react';
import { components, SingleValueProps } from 'react-select';
import { Flex, Image, Text } from '@chakra-ui/react';
import find from 'lodash/find';
import get from 'lodash/get';

interface CoInstructorValue {
  id: number;
  name: string;
}

export const SingleValue: FC<SingleValueProps> = props => {
  const { data, children, options } = props;
  const id = (data as CoInstructorValue).id;
  const imageUrl = get(find(options, { id }), 'avatar', '');

  return (
    <components.SingleValue {...props}>
      <Flex gap="8px" alignItems="center">
        <Image src={imageUrl} maxWidth="24px" maxHeight="24px"/>
        <Text>{children}</Text>
      </Flex>
    </components.SingleValue>
  );
};
