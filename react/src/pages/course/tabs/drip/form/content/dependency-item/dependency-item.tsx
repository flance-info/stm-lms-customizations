import { FC, useCallback } from 'react';
import { chakra, Flex, Text, VStack } from '@chakra-ui/react';
import { DndContext, useDroppable } from '@dnd-kit/core';
import { DragEndEvent } from '@dnd-kit/core/dist/types';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useFieldArray } from 'react-hook-form';

import { DeleteButton } from '~/components/delete-button';
import { DependencyItemProps } from './dependency-item-interfaces';
import { DragDropItem } from '~/components/drag-drop/DragDropItem';
import { Material } from './material';
import { getIndexesByFieldId, WithFieldsPrefix } from '~/helpers/form';
import { useConfirm } from '~/common/hooks';
import { usePrefix } from '~/helpers/form/with-prefix-context';
import { useTranslate } from '~/services';

import { ReactComponent as DripArrow } from '~/assets/icons/drip-arrow.svg';

const Dropzone = chakra(Flex, {
  baseStyle: {
    flexDirection: 'column',
    border: '2px dashed',
    borderColor: 'dark30',
    borderRadius: '4px',
    padding: '10px',
    gap: '10px',
    minHeight: '125px',
  },
});

const Container = chakra(Flex, {
  baseStyle: {
    width: '570px',
    flexDirection: 'column',
    gap: '10px',
    margin: '0 20px 20px',
  },
});

const EmptyDropZone = chakra(Flex, {
  baseStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 0',
  },
  shouldForwardProp() {
    return true;
  },
});

export const DependencyItem: FC<DependencyItemProps> = ({ onRemove, index }) => {
  const { __ } = useTranslate();

  const withPrefix = usePrefix();
  const fieldName = withPrefix('materials');
  const { fields, move, remove } = useFieldArray({ name: fieldName });

  const onDeleteConfirm = useConfirm(onRemove, __('Are you sure you want to delete this drip content?'));

  const { setNodeRef, isOver } = useDroppable({
    id: withPrefix(),
    data: { index, name: fieldName },
  });

  const onDragEnd = useCallback((e: DragEndEvent) => {
    const [from, to] = getIndexesByFieldId<string>(fields, [e.active.id as string, e.over?.id as string]);
    move(from, to);
  }, [fields, move]);

  const onRemoveMaterial = (index: number) => remove(index);

  return (
    <DndContext onDragEnd={onDragEnd}>
      <SortableContext id="drip-content" items={fields} strategy={verticalListSortingStrategy}>
        <Container>
          <Flex alignItems="center" gap="10px">
            <Text color="dark100" fontWeight="bold">{__(`Drip content ${index + 1}`)}</Text>
            <DeleteButton onClick={onDeleteConfirm} />
          </Flex>
            <VStack spacing="10px" align="stretch">
              <Dropzone ref={setNodeRef} bg={isOver ? 'mainBackground' : 'inherit'}>
                {!fields.length
                  ? <EmptyDropZone>{__('Drag lessons here')}</EmptyDropZone>
                  : fields.map((field, idx) => {
                    return (
                      <DragDropItem draggableId={field.id} key={`${field.id}-${idx}`}>
                        <WithFieldsPrefix prefix={`${fieldName}.${idx}`} key={`${field.id}-${idx}`}>
                          <Flex>
                            {idx !== 0 && <Flex p="0 10px" flex="0 0 auto"><DripArrow/></Flex>}
                            <Material isDragged={isOver} onRemove={() => onRemoveMaterial(idx)}/>
                          </Flex>
                        </WithFieldsPrefix>
                      </DragDropItem>
                    );
                  })
                }
              </Dropzone>
            </VStack>
        </Container>
      </SortableContext>
    </DndContext>
  );
};
