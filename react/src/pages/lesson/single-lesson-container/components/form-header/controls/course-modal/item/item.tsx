import { FC, memo } from 'react';
import { chakra, Flex, Radio } from '@chakra-ui/react';

import { ItemProps } from './item-interfaces';
import { useTranslate } from '~/services';

const ItemContainer = chakra(Flex, {
  baseStyle: {
    height: '50px',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    cursor: 'pointer',
    borderBottom: '1px solid',
    borderColor: 'border',
    '&:hover': { bg: 'mainBackground' },
  },
});

export const Item: FC<ItemProps> = memo(({ title, isChecked, onClick }) => {
  const { __ } = useTranslate();
  return (
    <>
      <ItemContainer
        onClick={onClick}
        bg={isChecked ? 'mainBackground' : 'white'}
      >
        {title || __('Untitled')}
        <Radio variant="msVariant" isChecked={isChecked}/>
      </ItemContainer>
    </>
  );
});