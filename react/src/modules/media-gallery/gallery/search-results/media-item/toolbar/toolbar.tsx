import { FC } from 'react';
import { chakra, Flex, Icon, Text } from '@chakra-ui/react';

import { DeleteButton } from '~/components/delete-button';
import { Loader } from '~/components/loader';
import { useRemoveFile } from './toolbar-hooks';

import { ReactComponent as PencilIcon } from 'assets/icons/pencil-icon.svg';

const Container = chakra(Flex, {
  baseStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '-30px',
    borderRadius: '0px 0px 4px 4px',
    zIndex: 5,
    bg: 'white',
    h: '30px',
    paddingX: '10px',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid',
    borderColor: 'mainBackground',
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
  },
});

interface ToolbarProps {
  id: number;
  date: string;
  size: string;
  onEdit: () => void;
}

export const Toolbar: FC<ToolbarProps> = ({ id, date, size, onEdit }) => {
  const { isLoading, confirmRemove } = useRemoveFile(id);

  return (
    <Container>
      <Flex gap="10px">
        <Text fontSize="xs" color="dark50">{date}</Text>
        <Text fontSize="xs" color="dark50">{size}</Text>
      </Flex>
      <Flex gap="10px" alignItems="center">
        <Icon
          as={PencilIcon}
          cursor="pointer"
          color="dark50"
          _hover={{ color: 'dark70' }}
          onClick={onEdit}
        />
        {isLoading
          ? <Loader isCenter={false}/>
          : <DeleteButton onClick={confirmRemove}/>
        }
      </Flex>
    </Container>
  );
};
