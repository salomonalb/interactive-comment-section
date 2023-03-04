import { commentType } from "./commentType";

export type globalDataType = {
  data: commentType[];
  addComment: (comment: commentType) => void;
  deleteComment: (comment: commentType) => void;
  editComment: (comment: commentType) => void;
  upvoteComment: (comment: commentType) => void;
  downvoteComment: (comment: commentType) => void;
  replyToComment: (reply: commentType) => void;
};
