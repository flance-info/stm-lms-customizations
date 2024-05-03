import { FormControlProps } from '@chakra-ui/form-control';

export interface FieldControlProps extends FormControlProps {
  label?: string;
  name: string;
  fullWidth?: string;
}
