import { cssVar, defineStyle, defineStyleConfig } from '@chakra-ui/react';

const $arrowBg = cssVar('popper-arrow-bg');
const error = defineStyle(() => ({
  [$arrowBg.variable]: '#FF3945',
  borderRadius: '4px',
  background: 'error',
  borderColor: 'error',
  padding: '11px 20px',
  fontSize: 'sm',
  fontWeight: 'medium',
  color: 'white',
  zIndex: 20,
}));

export const Tooltip = defineStyleConfig({ variants: { error } });
