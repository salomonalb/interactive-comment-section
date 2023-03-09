import { ReactNode, useEffect, useReducer } from "react";
import { globalData } from "../context/globalData";
import { INITIAL_DATA } from "../constants/INITIAL_DATA";
import { commentType } from "../types/commentType";
import { ACTION_TYPES } from "../constants/ACTION_TYPES";
import reducer from "../functions/reducer";

type CommentsDataProviderProps = {
  children: ReactNode[];
};

function CommentsDataProvider({ children }: CommentsDataProviderProps) {

  const localState = (localStorage.getItem('state'))

  const parsedState: commentType[] = localState ? JSON.parse(localState) : INITIAL_DATA

  const [state, dispatch] = useReducer(reducer, parsedState);

  useEffect(()=> {
    localStorage.setItem('state', JSON.stringify(state))
  }, [state])

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
  function sortStateComments() {
    dispatch({ type: ACTION_TYPES.SORT_COMMENTS, payload: {} as commentType });
  }

  return (
    <>
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
          sortStateComments,
        }}
      >
        {children}
      </globalData.Provider>
    </>
  );
}

export default CommentsDataProvider;
