import { Option } from '~/models';
import { CommonFieldProps } from '../../common-interfaces';

type SelectSize = 'default' | 'sm';
type SelectVariant = 'default' | 'with-suffix' | 'option-fit';

export interface SelectFieldProps extends CommonFieldProps {
  label?: string;
  name: string;
  isClearable?: boolean;
  options: Option[];
  placeholder?: string;
  menuPortalTarget?: HTMLElement;
  size?: SelectSize;
  optionLabel?: string;
  variant?: SelectVariant;
  withBorder?: boolean;
}
