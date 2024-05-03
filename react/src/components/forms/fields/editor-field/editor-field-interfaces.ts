export interface EditorFieldProps {
  label?: string;
  name: string;
  height?: string;
}

export interface EditorInputProps {
  value: string;
  onChange: (value: string) => void;
  height?: string;
  onBlur: () => void;
  onFocus: () => void;
}
