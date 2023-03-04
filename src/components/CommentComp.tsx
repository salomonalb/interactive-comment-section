import { useContext, useEffect, useState } from "react";
import { CurrentUser } from "../context/CurrentUser";
import { commentType } from "../types/commentType";
import { globalData } from "../context/globalData";
import EditForm from "./EditForm";
import ReplyForm from "./ReplyForm";

type commentProps = {
  commentObj: commentType;
};

function CommentComp({ commentObj }: commentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const replies = commentObj.replies.map((reply) => {
    return <CommentComp key={reply.id} commentObj={reply} />;
  });

  const user = useContext(CurrentUser);
  const {
    deleteComment,
    upvoteComment,
    downvoteComment,
    deleteReply,
    upvoteReply,
    downvoteReply,
    sortState
  } = useContext(globalData);

  const replyProps = commentObj.parentId ? {
    parentId: commentObj.parentId, 
    parentAuthor: commentObj.author.username, 
    setIsReplying
  } : {
    parentId: commentObj.id,
    parentAuthor: commentObj.author.username, 
    setIsReplying
  }

  function handleDelete() {
    if (commentObj.parentId) {
      deleteReply(commentObj);
    } else {
      deleteComment(commentObj);
    }
  }

  function handleEdit() {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  }

  function handleUpvote() {
    if (commentObj.parentId) {
      upvoteReply(commentObj);
    } else {
      upvoteComment(commentObj);
    }
    sortState()
  }

  function handleDownvote() {
    if (commentObj.parentId) {
      downvoteReply(commentObj);
    } else {
      downvoteComment(commentObj);
    }
    sortState()
  }
  function handleReply() {
    setIsReplying((prevIsReplying) => !prevIsReplying);
  }

  useEffect(() => {
    setIsEditing(false);
  }, [user]);

  useEffect(() => {
    setIsReplying(false);
  }, [user]);

  return (
    <article>
      <hr />
      {user.username === commentObj.author.username ? "YOU" : null}

      {user.username === commentObj.author.username ? (
        <button onClick={handleDelete}>Delete This Comment</button>
      ) : null}

      {user.username === commentObj.author.username ? (
        <button onClick={handleEdit}>
          {isEditing ? "Editing" : "Edit This Comment"}
        </button>
      ) : null}

      {user.username !== commentObj.author.username ? (
        <button onClick={handleReply}>Reply to This Comment</button>
      ) : null}

      {user.username !== commentObj.author.username ? (
        <button onClick={handleUpvote}>Arrivoto</button>
      ) : null}

      {user.username !== commentObj.author.username ? (
        <button onClick={handleDownvote}>bajivoto</button>
      ) : null}

      <p>{commentObj.votes}</p>
      <p>{commentObj.author.username}</p>
      <p>
        <img src={commentObj.author.avatar} />
      </p>

      {isEditing ? (
        <EditForm setIsEditing={setIsEditing} commentToEdit={commentObj} />
      ) : (
        <p>{commentObj.commentText}</p>
      )}

      <p>{commentObj.date}</p>
      <p>{commentObj.id}</p>

      
      {isReplying ? (
        <ReplyForm {...replyProps} />
      ) : null}

      <div style={{ paddingLeft: "100px" }}>{replies}</div>
    </article>
  );
}

export default CommentComp;
