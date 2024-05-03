import { FC } from 'react';
import {
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';

import { ELessonType, Exams, QuestionMediaTypes } from '~/models';
import { EPlugin } from '~/common/constants';
import { useGetPopupOptions } from './popup-hooks';
import { useTranslate } from '~/services';
import { useHasPluginsOrAddons } from '~/common/hooks';

interface PopupProps {
  type: ELessonType | Exams | QuestionMediaTypes;
}

export const Popup: FC<PopupProps> = ({ type }) => {
  const { link, title, text } = useGetPopupOptions(type);
  const { __ } = useTranslate();
  const { hasPlugin } = useHasPluginsOrAddons();
  const onClick = () => {
    window.open(link, '_blank');
  };

  return (
    <Popover trigger="hover" placement="right">
      <PopoverTrigger>
        <Flex position="absolute" top={0} left={0} w="100%" h="100%" zIndex={2}/>
      </PopoverTrigger>
      <PopoverContent p="25px 15px" borderRadius="4px">
        <PopoverArrow />
        <PopoverBody m="0" p="0">
          <Flex gap="4px" flexDirection="column">
            <Text
              color="dark"
              fontSize="md"
              fontWeight="medium"
              align="center"
            >
              {title}
            </Text>
            <Text
              color="dark70"
              fontWeight="medium"
              align="center"
            >
              {text}
            </Text>
          </Flex>
          <Flex justify="center">
            <Button onClick={onClick} variant="primary" m="10px 0 0">{
              hasPlugin(EPlugin.LMS_PRO)
                ? __('Enable addon')
                : __('Enable Pro')
            }</Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
