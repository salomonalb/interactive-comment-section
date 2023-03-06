import { useContext, useEffect, useState } from "react";
import { CurrentUser } from "../context/CurrentUser";
import { commentType } from "../types/commentType";
import { globalData } from "../context/globalData";
import EditForm from "./EditForm";
import ReplyForm from "./ReplyForm";
import DeleteModal from "./DeleteModal";
import plusIcon from "../assets/images/icon-plus.svg";
import minusIcon from "../assets/images/icon-minus.svg";

function getTime(date: number): string {
  const seconds = Math.floor(
    (Date.now() - date) / 1000
  )
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`
  } 

  const minutes = Math.floor(
    seconds / 60
  )
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`
  }

  const hours = Math.floor(
    minutes / 60
  )
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`
  }

  const days = Math.floor(
    hours / 24
  )
  if (days < 7) {
    return `${days} day${days !== 1 ? "s" : ""} ago`
  }

  const weeks = Math.floor(
    days / 7
  )
  if (weeks < 4) {
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`
  }

  const months = Math.floor(
    days / 30
  )
  if (months < 12) {
    return `${months} month${months !== 1 ? "s" : ""} ago`
  }

  const years = Math.floor(
    days / 365
  )
  return `${years} year${years !== 1 ? "s" : ""} ago`
}

type commentProps = {
  commentObj: commentType;
};

function CommentComp({ commentObj }: commentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
    sortStateComments,
  } = useContext(globalData);

  const replyProps = commentObj.parentId
    ? {
        parentId: commentObj.parentId,
        parentAuthor: commentObj.author.username,
        setIsReplying,
      }
    : {
        parentId: commentObj.id,
        parentAuthor: commentObj.author.username,
        setIsReplying,
      };
  function handleDelete() {
    setIsDeleting(true);
  }

  function handleDeleteModal() {
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
    sortStateComments();
  }

  function handleDownvote() {
    if (commentObj.parentId) {
      downvoteReply(commentObj);
    } else {
      downvoteComment(commentObj);
    }
    sortStateComments();
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

  // i can move the votes component, the info component, and the actions component
  // to their own files later

  return (
    <article className="comment">
      {isDeleting ? (
        <DeleteModal
          setIsDeleting={setIsDeleting}
          handleDeleteModal={handleDeleteModal}
        />
      ) : null}

      <div className="comment__votes-container">
          <button className="comment__upvote" onClick={ user.username !== commentObj.author.username ? handleUpvote: undefined}>
            <img src={plusIcon} alt="upvote" />
          </button>

        <p className="comment__votes">{commentObj.votes}</p>

          <button className="comment__downvote" onClick={user.username !== commentObj.author.username ? handleDownvote: undefined}>
            <img src={minusIcon} alt="downvote" />
          </button>
      </div>

      <div className="comment__info-container">
        <div className="comment__avatar-container">
          <img className="comment__avatar"
            src={commentObj.author.avatar}
            alt={commentObj.author.username}
          />
        </div>
        <address className="comment__username-container" >
          <p className="comment__username" >{commentObj.author.username}</p>
          {user.username === commentObj.author.username ? (
            <span className="comment__tag">you</span>
          ) : null}
        </address>
        <time className="comment__date" dateTime="">{getTime(commentObj.date)}</time>
      </div>

      <div>
      {user.username === commentObj.author.username ? (
          <button onClick={handleDelete}>Delete This Comment</button>
        ) : null}
        {user.username !== commentObj.author.username ? (
          <button onClick={handleReply}>Reply to This Comment</button>
        ) : null}
        {user.username === commentObj.author.username ? (
          <button onClick={handleEdit}>
            {isEditing ? "Editing" : "Edit This Comment"}
          </button>
        ) : null}
      </div>

      <div>
        {isEditing ? (
          <EditForm setIsEditing={setIsEditing} commentToEdit={commentObj} />
        ) : (
          <p>{commentObj.commentText}</p>
        )}
      </div>

      {isReplying ? <ReplyForm {...replyProps} /> : null}

      <section style={{ paddingLeft: "100px" }}>{replies}</section>
    </article>
  );
}

export default CommentComp;
