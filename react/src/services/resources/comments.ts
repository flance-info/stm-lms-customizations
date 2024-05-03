import { APIResource } from './interfaces';

interface CommentPayload {
  commentId: string;
  content: string;
}

export class CommentsResource extends APIResource {
  getBy = (postId: string) => this._provider.get(`/comments/${postId}`);
  create = (postId: string, content: string) => this._provider.post(`/comments/${postId}`, { content });
  reply = ({ commentId, content }: CommentPayload) => {
    return this._provider.post(`/comments/${commentId}/reply`, { content });
  };
  update = ({ commentId, content }: CommentPayload) => {
    return this._provider.post(`/comments/${commentId}/update`, { content });
  };
  remove = (commentId: string) => {
    return this._provider.post(`/comments/${commentId}/trash`, {});
  };
}
