export interface FooterProps {
  onCancel: () => void;
  onSave: () => void;
  isDisabled: boolean;
  isSection?: boolean;
  isLoading?: boolean;
}
