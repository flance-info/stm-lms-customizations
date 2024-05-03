import { FC, memo, useState } from 'react';
import { Button, Collapse, Flex, useDisclosure } from '@chakra-ui/react';
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { DragEndEvent } from '@dnd-kit/core/dist/types';
import { SortableContext } from '@dnd-kit/sortable';
import { useParams } from 'react-router-dom';

import { AccordionIcon } from '~/components/accordion-icon';
import { getIndexesByFieldId } from '~/helpers/form';
import { LessonsModal } from '~/components/lessons-modal';
import { Loader } from '~/components/loader';
import { MaterialsModal } from '../../modals';
import { SectionContainerProps } from './sidebar-section-interfaces';
import { SectionMaterials } from './section-materials';
import { SidebarSection } from './sidebar-section';
import { useGetLessons, useSidebarSectionHook, useUpdateMaterials } from './sidebar-section-hooks';
import { useSidebarContext } from '../../sidebar-context';
import { useSortableItem } from '~/components/drag-drop/DragDropItem';
import { useTranslate } from '~/services';

export const SidebarSectionContainer: FC<SectionContainerProps> = memo((props) => {
  const { section } = props;
  const { sectionId: activeSectionId } = useParams<{ sectionId?: string }>();
  const { courseId, groupedBySections, newSectionId, sections } = useSidebarContext();

  const ids = sections.map(item => item.id);
  const defaultIsExpanded = [parseInt(activeSectionId || '0', 10), newSectionId, ...ids].includes(section.id);

  const [isExpanded, setIsExpanded] = useState<boolean>(defaultIsExpanded);

  const { __ } = useTranslate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { lessons, exams } = useGetLessons();

  const { attributes, setNodeRef, style } = useSortableItem();
  const { removeCourseSection, isLoading } = useSidebarSectionHook();
  const materials = groupedBySections[section.id] || [];

  const updateMaterials = useUpdateMaterials(courseId);

  const removeClickHandler = (id: number) => () => removeCourseSection(id);
  const arrowClickHandler = () => {
    setIsExpanded(!isExpanded);
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const onDragEnd = (e: DragEndEvent) => {
    const [from, to] = getIndexesByFieldId<number>(materials, [e.active.id as number, e.over?.id as number]);
    if (from === to || to === -1) {
      return;
    }

    const material = materials[from];

    updateMaterials.mutate({
      ...material,
      order: materials[to].order,
    });
  };

  return (
    <Flex
      bg="white"
      borderRadius="4px"
      flexDirection="column"
      cursor="pointer"
      ref={setNodeRef}
      style={style}
      {...attributes}
      onClick={arrowClickHandler}
    >
      <>
        <SidebarSection section={section} onRemoveClick={removeClickHandler(section.id)}>
          {isLoading
            ? <Loader isCenter={false}/>
            : <AccordionIcon
                isOpen={isExpanded}
                onClick={e => {
                  e.stopPropagation();
                  arrowClickHandler();
                }}
              />
          }
        </SidebarSection>
        <Collapse
          in={isExpanded}
          animateOpacity
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <Flex p="10px" flexDirection="column" >
            <Flex flexDirection="column">
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                <SortableContext id="materials" items={materials}>
                  <SectionMaterials materials={materials} section={section} />
                </SortableContext>
              </DndContext>
            </Flex>
            <Flex justify="space-between" p="10px 0">
              <LessonsModal
                lessons={lessons}
                exams={exams}
                isOpen={isOpen}
                onClose={onClose}
                sectionId={section.id.toString()}
              />
              <Button
                fontWeight="bold"
                m="0"
                leftIcon={<span className="icon-plus-circle"/>}
                minHeight="40px"
                onClick={onOpen}>
                {__('Add a lesson')}
              </Button>
              <MaterialsModal section={section} />
            </Flex>
          </Flex>
        </Collapse>
      </>
    </Flex>
  );
});
