import { createContext, FC, ReactNode, useContext, useMemo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import omit from 'lodash/omit';

const DragDropItemContext = createContext<{ id: string | number }>(undefined!);

interface DragDropItemProps {
  draggableId: string | number;
  children: ReactNode;
}

export const DragDropItem: FC<DragDropItemProps> = ({ draggableId, children }) => {
  const value = useMemo(() => ({ id: draggableId }), [draggableId]);
  return <DragDropItemContext.Provider value={value}>{children}</DragDropItemContext.Provider>;
};

export const useDragDropItem = () => useContext(DragDropItemContext);

export const useSortableItem = (id?: string | number) => {
  const { id: draggableId } = useDragDropItem();
  if (!id) id = draggableId;
  const sortable = useSortable({
    id,
  });

  return {
    ...omit(sortable, ['transform', 'transition']),
    attributes: omit(sortable.attributes, ['role']),
    style: {
      transform: CSS.Translate.toString(sortable.transform),
      transition: 'none',
    },
  };
};
