import { useWatch } from 'react-hook-form';
import {
  Box,
  Button,
  chakra,
  forwardRef,
  Heading,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger, Text,
} from '@chakra-ui/react';

import { CommonFieldProps } from '~/components/forms/common-interfaces';
import { useTranslate } from '~/services';

import { ReactComponent as PlusCircleFilledIcon } from 'assets/icons/plus-circle-filled.svg';
import { ReactComponent as PencilIcon } from 'assets/icons/pencil-icon.svg';
import { TextField } from '~/components/forms/fields';
import { memo } from 'react';

const ExplanationFieldContainer = chakra(Box, {
  baseStyle: {
    position: 'relative',
    zIndex: 10,
  },
});

const ButtonIcon = chakra(Icon, {
  baseStyle: {
    color: 'primary',
    boxSize: '14px',
    mr: '5px',
    '[role=button]:hover &': {
      color: 'white',
    },
  },
});

export const ExplanationField = memo(forwardRef<CommonFieldProps, 'div'>((props, ref) => {
    const { name } = props;
    const { __ } = useTranslate();
    const value = useWatch({ name });

    const ui = value ? {
      icon: PencilIcon,
      title: __('Edit explanation'),
    } : {
      icon: PlusCircleFilledIcon,
      title: __('Add explanation'),
    };

    return <ExplanationFieldContainer ref={ref}>
      <Popover placement={'top'}>
        <PopoverTrigger>
          <Button size={'smallx'} m={0} borderRadius={'sm'} color={'dark'} role={'button'}>
            <ButtonIcon as={ui.icon} />
            {ui.title}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>
            <Heading size={'sm'}>{__('Answer explanation')}</Heading>
            <Text color={'gray'} fontSize={'12px'}>{__('Will be shown in "Show answer" section')}</Text>
          </PopoverHeader>
          <PopoverBody>
            <TextField name={name} placeholder={__('Enter explanation')} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </ExplanationFieldContainer>;
  }))
;
