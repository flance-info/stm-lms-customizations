import { Comment } from '~/models';

export interface CommentWithReplies extends Comment {
  replies: Comment[];
}
