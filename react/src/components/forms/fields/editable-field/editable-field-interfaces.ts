import { EditableProps } from '@chakra-ui/react';
import { InputProps } from '@chakra-ui/input/dist/input';

export interface EditableFieldProps extends EditableProps {
  name: string;
  inputProps?: InputProps;
  isPreviewClickable?: boolean;
}
