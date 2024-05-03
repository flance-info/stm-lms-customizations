import { chakra } from '@chakra-ui/react';
import { OptionBox } from '../../../../question-item-styles';

export const OptionContainer = chakra(OptionBox, {
  baseStyle: {
    minHeight: '40px',
    alignItems: 'center',
    mb: '10px',
    mr: '10px',
    w: 'calc(100% - 10px)',
  },
});
