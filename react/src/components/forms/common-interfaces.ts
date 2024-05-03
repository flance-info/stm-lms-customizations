export type CommonFieldProps<T = object> = {
  name: string;
  value?: any;
  label?: string;
  placeholder?: string;
} & T;
