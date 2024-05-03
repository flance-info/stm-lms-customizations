import { extendTheme } from '@chakra-ui/react';

import { Accordion } from './accordion-styles-config';
import { borderRadius } from './border-radius-styles-config';
import { Button } from './button-styles-config';
import { Checkbox } from './checkbox-styles-config';
import { colors } from './colors-styles-config';
import { Divider } from './divider-styles-config';
import { Drawer } from './drawer-styles-config';
import { fontSizes, fontWeights, lineHeights } from './fonts-styles-config';
import { Input } from './input-styles-config';
import { Link } from './link-styles-config';
import { Menu } from './menu-styles-config';
import { Modal } from './modal-styles-config';
import { NumberInput } from './number-input-styles-config';
import { Popover } from './popover-styles-config';
import { Progress } from './progress-bar-styles-config';
import { Radio } from './radio-styles-config';
import { Switch } from './switch-styles-config';
import { Tabs } from './tabs-styles-config';
import { Textarea } from './textarea-styles-config';
import { Tooltip } from '~/styles/tooltip-styles-config';

export const msPluginTheme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors,
  components: {
    Accordion,
    Button,
    Checkbox,
    Divider,
    Drawer,
    Input,
    Link,
    Menu,
    Modal,
    NumberInput,
    Popover,
    Progress,
    Radio,
    Switch,
    Tabs,
    Textarea,
    Tooltip,
  },
  fonts: {
    heading: 'Eudoxus Sans Medium, sans-serif',
    body: 'Eudoxus Sans Medium, sans-serif',
  },
  fontSizes,
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '1200px',
    xl: '1400px',
  },
  fontWeights,
  lineHeights,
  styles: {
    global: {
      body: {
        fontSize: 'sm',
        fontWeight: 'normal',
        bg: 'mainBackground',
      },
      svg: {
        fill: 'currentColor',
      },
    },
  },
  ...borderRadius,
});
