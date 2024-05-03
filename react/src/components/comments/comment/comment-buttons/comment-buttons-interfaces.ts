export interface CommentButtonsProps {
  onSubmit: () => void;
  onCancel: () => void;
  isLoading: boolean;
  isDisabledSubmit?: boolean;
}