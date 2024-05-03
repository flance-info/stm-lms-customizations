import { FC, memo } from 'react';
import { Flex, Image, Text } from '@chakra-ui/react';
import { components, OptionProps } from 'react-select';

interface CoInstructorData {
  avatar: string;
  description: string;
  id: number;
  link: string;
  meta: [];
  name: string;
  slug: string;
  url: string;
}

export const Option: FC<OptionProps> = memo((props) => {
  const { label, data } = props;

  return (
    <components.Option {...props}>
      <Flex gap="8px" alignItems="center">
        <Image src={(data as CoInstructorData).avatar} maxWidth="24px" maxHeight="24px" />
        <Text>{label}</Text>
      </Flex>
    </components.Option>
  );
});
