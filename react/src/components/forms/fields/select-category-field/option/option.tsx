import { FC, memo } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { components, OptionProps } from 'react-select';
import noop from 'lodash/noop';

import { Category } from '~/models';

export const Option: FC<OptionProps> = memo((props) => {
  const { label, isSelected, data } = props;

  return (
    <components.Option {...props}>
      <Flex alignItems="center" pl={(data as Category).parent !== 0 ? '20px': '0px'}>
        <input type="checkbox" checked={isSelected} onChange={noop} />
        <Text ml="10px">{label}</Text>
      </Flex>
    </components.Option>
  );
});
