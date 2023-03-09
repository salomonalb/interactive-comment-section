import { commentType } from "./commentType";

export type globalDataType = {
  data: commentType[];
  addComment: (comment: commentType) => void;
  deleteComment: (comment: commentType) => void;
  editComment: (comment: commentType) => void;
  upvoteComment: (comment: commentType) => void;
  downvoteComment: (comment: commentType) => void;
  addReply: (comment: commentType) => void;
  deleteReply: (comment: commentType) => void;
  upvoteReply: (comment: commentType) => void;
  downvoteReply: (comment: commentType) => void;
  editReply: (comment: commentType) => void;
  sortStateComments: () => void;
};
