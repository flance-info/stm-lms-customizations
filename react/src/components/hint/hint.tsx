import { FC, memo } from 'react';
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';

import { HintProps } from './hint-interfaces';

export const Hint: FC<HintProps> = memo(({ header, text }) => {
  return (
    <Popover placement="top">
      <PopoverTrigger>
        <div className="icon-hint" />
      </PopoverTrigger>
      <PopoverContent>
        {header && <PopoverHeader>{header}</PopoverHeader>}
        <PopoverArrow />
        <PopoverCloseButton/>
        <PopoverBody>
          {text}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
});
