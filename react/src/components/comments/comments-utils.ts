import groupBy from 'lodash/groupBy';

import { Comment } from '~/models';

export const getFormattedComments = (comments: Comment[]) => {
  if (!comments.length) return [];

  const groupedByParent = groupBy(comments, 'parent');
  const parents = groupedByParent['0'];

  if (!Array.isArray(parents)) {
    return [];
  }

  return parents.map(parent => {
    const replies: Comment[] = [];
    const repliedComment = groupedByParent[parent.id];

    if (repliedComment) {
      replies.push(...repliedComment);
    }

    return { ...parent, replies };
  });
};
