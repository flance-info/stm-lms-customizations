import { FC } from 'react';
import {
  Button,
  Flex,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';

import { PopupProps } from './popup-interfaces';
import { EPlugin } from '~/common/constants';
import { useTranslate } from '~/services';
import { useHasPluginsOrAddons } from '~/common/hooks';

import { ReactComponent as LockIcon } from '~/assets/icons/lock-icon.svg';

export const Popup: FC<PopupProps> = ({ link }) => {
  const { __ } = useTranslate();
  const { hasPlugin } = useHasPluginsOrAddons();
  const handleClick = () => {
    window.open(link, '_blank');
  };

  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <Icon as={LockIcon} boxSize="16px" cursor="pointer"/>
      </PopoverTrigger>
      <PopoverContent maxWidth="200px">
        <PopoverArrow />
        <PopoverBody m="5px">
          <Flex flexDirection="column" alignItems="center">
            {__('Addon is disabled')}
            <Button onClick={handleClick} variant="primary" size="sm" m="10px 0 0">
              {hasPlugin(EPlugin.LMS_PRO) ? __('Enable') : __('Enable Pro')}
            </Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
