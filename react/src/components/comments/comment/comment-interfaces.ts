import { Comment } from '~/models';

export interface CommentProps {
  comment: Comment;
  isSubComment?: boolean;
}

export interface CommentOptions {
  variant: string;
  isReadOnly: boolean;
}