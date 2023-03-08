import { commentType } from "../types/commentType";
import { actionType } from "../types/actionType";
import { ACTION_TYPES } from "../constants/ACTION_TYPES";
import sortComments from "./sortComments";

export default function reducer(oldState: commentType[], action: actionType) {
    switch (action.type) {
      case ACTION_TYPES.ADD_COMMENT:
        return [...oldState, action.payload];
  
      case ACTION_TYPES.DELETE_COMMENT:
        return oldState.filter((comment) => comment.id !== action.payload.id);
  
      case ACTION_TYPES.EDIT_COMMENT:
        return oldState.map((oldComment) => {
          if (oldComment.id === action.payload.id) {
            return { ...oldComment, commentText: action.payload.commentText };
          } else {
            return oldComment;
          }
        });
  
      case ACTION_TYPES.UPVOTE_COMMENT:
        return oldState.map((oldComment) => {
          if (oldComment.id === action.payload.id) {
            return { ...oldComment, votes: oldComment.votes + 1 };
          } else {
            return oldComment;
          }
        });
  
      case ACTION_TYPES.DOWNVOTE_COMMENT:
        return oldState.map((oldComment) => {
          if (oldComment.id === action.payload.id) {
            return { ...oldComment, votes: oldComment.votes - 1 };
          } else {
            return oldComment;
          }
        });
  
      case ACTION_TYPES.ADD_REPLY:
        return oldState.map((oldComment) => {
          if (oldComment.id === action.payload.parentId) {
            return {
              ...oldComment,
              replies: [...oldComment.replies, action.payload],
            };
          } else {
            return oldComment;
          }
        });
  
      case ACTION_TYPES.DELETE_REPLY:
        return oldState.map((oldComment) => {
          if (oldComment.id === action.payload.parentId) {
            return {
              ...oldComment,
              replies: [
                ...oldComment.replies.filter(
                  (reply) => reply.id !== action.payload.id
                ),
              ],
            };
          } else {
            return oldComment;
          }
        });
  
      case ACTION_TYPES.UPVOTE_REPLY:
        return oldState.map((oldComment) => {
          if (oldComment.id === action.payload.parentId) {
            return {
              ...oldComment,
              replies: oldComment.replies.map((oldReply) => {
                if (oldReply.id === action.payload.id) {
                  return { ...oldReply, votes: oldReply.votes + 1 };
                } else {
                  return oldReply;
                }
              }),
            };
          } else {
            return oldComment;
          }
        });
  
      case ACTION_TYPES.DOWNVOTE_REPLY:
        return oldState.map((oldComment) => {
          if (oldComment.id === action.payload.parentId) {
            return {
              ...oldComment,
              replies: oldComment.replies.map((oldReply) => {
                if (oldReply.id === action.payload.id) {
                  return { ...oldReply, votes: oldReply.votes - 1 };
                } else {
                  return oldReply;
                }
              }),
            };
          } else {
            return oldComment;
          }
        });
  
      case ACTION_TYPES.EDIT_REPLY:
        return oldState.map((oldComment) => {
          if (oldComment.id === action.payload.parentId) {
            return {
              ...oldComment,
              replies: oldComment.replies.map((oldReply) => {
                if (oldReply.id === action.payload.id) {
                  return { ...oldReply, commentText: action.payload.commentText };
                } else {
                  return oldReply;
                }
              }),
            };
          } else {
            return oldComment;
          }
        });
  
      case ACTION_TYPES.SORT_COMMENTS:
        return sortComments(oldState);
      default:
        return oldState;
    }
  }