import { FC } from 'react';
import { Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Portal } from '@chakra-ui/react';

import { PopupProps } from './popup-interfaces';
import { useTranslate } from '~/services';

export const Popup: FC<PopupProps> = ({ children }) => {
  const { __ } = useTranslate();

  return (
    <Popover flip>
      <PopoverTrigger>{children}</PopoverTrigger>
      <Portal>
        <PopoverContent w="fit-content" bg="dark50">
          <PopoverArrow bg="dark50" />
          <PopoverBody color="white">{__('Copied!')}</PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
