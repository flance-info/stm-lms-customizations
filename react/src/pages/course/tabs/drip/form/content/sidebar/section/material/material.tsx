import { FC } from 'react';
import { Flex } from '@chakra-ui/react';
import { useDraggable } from '@dnd-kit/core';

import { DragItem } from '~/components//drag-item';
import { MaterialIcon } from '~/components/material-icon';
import { MaterialProps } from './material-interfaces';
import { MaterialTitle } from '~/components/material-title';
import { PostType } from '~/models';

export const Material: FC<MaterialProps> = ({ material, isDragged }) => {
  const { listeners } = useDraggable({
    id: material.id,
    data: material,
  });

  const lessonType = material.post_type === PostType.STM_LESSONS ? material.lesson_type : material.post_type;

  return (
    <Flex
      alignItems="center"
      padding="5px"
      justify="space-between"
      border="1px solid"
      borderColor={isDragged ? 'mainBackground' : 'transparent'}
      borderRadius="4px"
      bg="white"
      {...listeners}
    >
      <Flex alignItems="center" maxWidth="280px">
        <DragItem/>
        <MaterialIcon lessonType={lessonType} />
        <MaterialTitle title={material.title}>
          {material.title}
        </MaterialTitle>
      </Flex>
    </Flex>
  );
};
