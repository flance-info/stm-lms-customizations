export interface ContentProps {
  onDrop: (files: File[]) => void;
  onClose: () => void;
  isLoading: boolean;
}
