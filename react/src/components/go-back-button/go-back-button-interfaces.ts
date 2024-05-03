export interface GoBackButtonProps {
  type: 'course' | 'lesson' | 'edit';
  onClick: () => void;
  label: string;
}