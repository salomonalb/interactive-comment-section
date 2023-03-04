import { ReactNode, useContext, useReducer } from "react";
import { globalData } from "../context/globalData";
import { INITIAL_DATA } from "../constants/INITIAL_DATA";
import { actionType } from "../types/actionType";
import { commentType } from "../types/commentType";
import { ACTION_TYPES } from "../constants/ACTION_TYPES";

function reducer(oldState: commentType[], action: actionType) {
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
    default:
      return oldState;
  }
}

type CommentsDataProviderProps = {
  children: ReactNode[];
};

function CommentsDataProvider({ children }: CommentsDataProviderProps) {
  const [state, dispatch] = useReducer(reducer, INITIAL_DATA);

  function addComment(comment: commentType) {
    dispatch({ type: ACTION_TYPES.ADD_COMMENT, payload: comment });
  }

  function deleteComment(comment: commentType) {
    dispatch({ type: ACTION_TYPES.DELETE_COMMENT, payload: comment });
  }

  function editComment(comment: commentType) {
    dispatch({ type: ACTION_TYPES.EDIT_COMMENT, payload: comment });
  }

  function upvoteComment(comment: commentType) {
    dispatch({ type: ACTION_TYPES.UPVOTE_COMMENT, payload: comment });
  }

  function downvoteComment(comment: commentType) {
    dispatch({ type: ACTION_TYPES.DOWNVOTE_COMMENT, payload: comment });
  }

  function addReply(reply: commentType) {
    dispatch({ type: ACTION_TYPES.ADD_REPLY, payload: reply });
  }

  function deleteReply(reply: commentType) {
    dispatch({ type: ACTION_TYPES.DELETE_REPLY, payload: reply });
  }

  function upvoteReply(reply: commentType) {
    dispatch({ type: ACTION_TYPES.UPVOTE_REPLY, payload: reply });
  }

  function downvoteReply(reply: commentType) {
    dispatch({ type: ACTION_TYPES.DOWNVOTE_REPLY, payload: reply });
  }

  function editReply(reply: commentType) {
    dispatch({ type: ACTION_TYPES.EDIT_REPLY, payload: reply });
  }

  return (
    <div>
      <globalData.Provider
        value={{
          data: state,
          addComment,
          deleteComment,
          editComment,
          upvoteComment,
          downvoteComment,
          addReply,
          deleteReply,
          upvoteReply,
          downvoteReply,
          editReply,
        }}
      >
        {children}
      </globalData.Provider>
    </div>
  );
}

export default CommentsDataProvider;
