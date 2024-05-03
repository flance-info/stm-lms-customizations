import { FC, useMemo } from 'react';
import { Button, Icon, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { getStatus } from './select-status-utils';
import { useGetStatusOptions, useSelectStatusControl } from './select-status-hooks';
import { useTranslate } from '~/services';

import { ReactComponent as ArrowTriangleIcon } from '~/assets/icons/arrow-triangle.svg';

export const SelectStatus: FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  if (!courseId) return null;

  const { __ } = useTranslate();
  const { statuses, isPremoderation, isInstructor, courseStatus } = useGetStatusOptions();
  const { selectedStatus, onChangeStatus } = useSelectStatusControl(courseId, courseStatus);

  const options = useMemo(() => {
    return statuses.filter(item => {
      if (selectedStatus === 'publish' && isPremoderation && isInstructor) {
        return item.id !== 'pending';
      } else {
        return item.id !== selectedStatus;
      }
    });
  }, [statuses, isPremoderation, isInstructor, selectedStatus]);

  const getStatusOptionLabel = (id: string) => {
    const status = getStatus(id, options);
    return status?.label;
  };

  const getTranslatedStatus = (status: string) => {
     switch (status) {
       case 'pending':
         return __('Pending for review');
       case 'draft':
        return __('Draft');
       case 'publish':
         return __('Published');
       default:
         return '';
     }
  };

  return (
    <Menu variant="courseStatus">
      <MenuButton
        as={Button}
        m="0px"
        variant={selectedStatus === 'pending' ? 'warning' : 'primary'}
        minWidth="112px"
        rightIcon={
          <Icon
            as={ArrowTriangleIcon}
            color="white"
            width="8px"
            height="5px"
          />
        }
      >
        {getTranslatedStatus(selectedStatus)}
      </MenuButton>
      <MenuList>
        {options.map(status => (
          <MenuItem
            key={status.id}
            onClick={() => onChangeStatus(status.id)}
          >
            {getStatusOptionLabel(status.id)}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
