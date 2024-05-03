import { Comment } from '~/models';

export interface PanelControlProps {
  onEdit: () => void;
  onReply: () => void;
  isSubComment?: boolean;
  comment: Comment;
}