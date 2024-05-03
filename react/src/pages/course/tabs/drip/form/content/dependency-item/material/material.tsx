import { FC } from 'react';
import { chakra, Flex } from '@chakra-ui/react';
import { useWatch } from 'react-hook-form';

import { DeleteButton } from '~/components/delete-button';
import { MaterialIcon } from '~/components/material-icon';
import { MaterialProps } from './material-interfaces';
import { PostType } from '~/models';
import { useConfirm } from '~/common/hooks';
import { usePrefix } from '~/helpers/form';
import { useSortableItem } from '~/components/drag-drop/DragDropItem';
import { useTranslate } from '~/services';

const Item = chakra(Flex, {
  baseStyle: {
    padding: '0 10px',
    alignItems: 'center',
    borderRadius: '4px',
    justifyContent: 'space-between',
    flex: 1,
  },
});

export const Material: FC<MaterialProps> = (props) => {
  const { onRemove, isDragged } = props;
  const { __ } = useTranslate();
  const onDeleteConfirm = useConfirm(onRemove, __('Are you sure you want to delete this drip item?'));
  const withPrefix = usePrefix();
  const formMaterial = useWatch({ name: withPrefix() });
  const material = props.material || formMaterial;
  const { attributes, setNodeRef, listeners, style } = useSortableItem();

  const lessonType = material.post_type === PostType.STM_LESSONS ? material.lesson_type : material.post_type;

  return (
    <Item {...attributes} ref={setNodeRef} style={style} bg={isDragged ? 'white' : 'mainBackground'}>
      <Flex gap="10px" alignItems="center" cursor="grab" flex={1} p="10px 0" {...listeners}>
        <MaterialIcon lessonType={lessonType}/>
        {material.title}
      </Flex>
      <DeleteButton onClick={onDeleteConfirm} flex="0 0 auto"/>
    </Item>
  );
};
