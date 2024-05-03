import { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';

import { DeleteButton } from '~/components/delete-button';
import { DragItem } from '~/components/drag-item';
import { SectionTitle } from './section-title';
import { SidebarActions } from './section-materials/material/material-styles';
import { SidebarSectionHeader } from './sidebar-section-styles';
import { SidebarSectionProps } from './sidebar-section-interfaces';
import { useConfirm } from '~/common/hooks';
import { useDragDropItem } from '~/components/drag-drop/DragDropItem';
import { useTranslate } from '~/services';

export const SidebarSection: FC<SidebarSectionProps> = (props) => {
  const { section, onRemoveClick, children } = props;
  const { __ } = useTranslate();

  const onDeleteConfirm = useConfirm(onRemoveClick, __('Are you sure you want to delete this section?'));

  const { id } = useDragDropItem();
  const { listeners } = useSortable({ id });

  return (
    <SidebarSectionHeader role={'group'}>
      <Flex alignItems="center">
        <DragItem
          {...listeners}
          onClick={e => {
            e.stopPropagation();
          }}
        />
        <Box textAlign="left">
          <SectionTitle section={section}/>
        </Box>
      </Flex>
      <Flex alignItems="center">
        <SidebarActions mr="10px" h="20px" _groupHover={{ opacity: 1, pointerEvents: 'auto' }}>
          <DeleteButton
            onClick={e => {
              e.stopPropagation();
              onDeleteConfirm();
            }}
          />
        </SidebarActions>
        {children}
      </Flex>
    </SidebarSectionHeader>
  );
};
