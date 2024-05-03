import { FC, memo } from 'react';
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { DragEndEvent } from '@dnd-kit/core/dist/types';
import { Flex } from '@chakra-ui/react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { DragDropItem } from '~/components/drag-drop/DragDropItem';
import { getIndexesByFieldId } from '~/helpers/form';
import { SidebarSectionContainer } from './sidebar-section';
import { useUpdateSection } from './sections-hooks';
import { useSidebarContext } from '../sidebar-context';

export const Sections: FC = memo(() => {
  const { courseId, sections } = useSidebarContext();

  const updateSection = useUpdateSection(courseId);

  const sensors = useSensors(useSensor(PointerSensor));

  const onDragEnd = (e: DragEndEvent) => {
    const [from, to] = getIndexesByFieldId<number>(sections, [e.active.id as number, e.over?.id as number]);
    if (to === -1) {
      return;
    }

    const section = sections[from];

    updateSection.mutate({
      ...section,
      order: sections[to].order,
    });
  };

  return (
    <Flex flexDirection="column" gap="10px" width="365px">
      <DndContext
        id="sections"
        autoScroll={false}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext items={sections} strategy={verticalListSortingStrategy}>
          {sections.map((section) => {
            return (
              <DragDropItem draggableId={section.id} key={section.id}>
                <SidebarSectionContainer section={section}/>
              </DragDropItem>
            );
          })}
        </SortableContext>
      </DndContext>
    </Flex>
  );
});
