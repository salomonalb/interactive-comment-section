import { useContext, useEffect, useState } from "react";
import { CurrentUser } from "../context/CurrentUser";
import { commentType } from "../types/commentType";
import { globalData } from "../context/globalData";
import EditForm from "./EditForm";
import ReplyForm from "./ReplyForm";
import DeleteModal from "./DeleteModal";
import { getTime } from "../functions/getTime";
import plusIcon from "../assets/images/icon-plus.svg";
import minusIcon from "../assets/images/icon-minus.svg";
import replyIcon from "../assets/images/icon-reply.svg";
import deleteIcon from "../assets/images/icon-delete.svg";
import editIcon from "../assets/images/icon-edit.svg";


type commentProps = {
  commentObj: commentType;
};

function CommentComp({ commentObj }: commentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  let replies: JSX.Element[] = [];
  if (commentObj.replies.length > 0) {
    replies = commentObj.replies.map((reply) => {
      return <CommentComp key={reply.id} commentObj={reply} />;
    });
  }

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
    <>
      <article className="comment">
        {isDeleting ? (
          <DeleteModal
            setIsDeleting={setIsDeleting}
            handleDeleteModal={handleDeleteModal}
          />
        ) : null}

        <div className="comment__votes-container">
          <button
            className="comment__upvote"
            onClick={
              user.username !== commentObj.author.username
                ? handleUpvote
                : undefined
            }
          >
            <img src={plusIcon} alt="upvote" />
          </button>

          <p className="comment__votes">{commentObj.votes}</p>

          <button
            className="comment__downvote"
            onClick={
              user.username !== commentObj.author.username
                ? handleDownvote
                : undefined
            }
          >
            <img src={minusIcon} alt="downvote" />
          </button>
        </div>

        <div className="comment__info-container">
          <div className="comment__avatar-container">
            <img
              className="comment__avatar"
              src={commentObj.author.avatar}
              alt={commentObj.author.username}
            />
          </div>
          <address className="comment__username-container">
            <p className="comment__username">{commentObj.author.username}</p>
            {user.username === commentObj.author.username ? (
              <span className="comment__tag">you</span>
            ) : null}
          </address>
          <time className="comment__date" dateTime="">
            {getTime(commentObj.date)}
          </time>
        </div>

        <div className="comment__options-container">
          {user.username === commentObj.author.username ? (
            <button className="comment__delete" onClick={handleDelete}>
              <img src={deleteIcon} alt="delete" />
              Delete
            </button>
          ) : null}
          {user.username !== commentObj.author.username ? (
            <button className="comment__reply" onClick={handleReply}>
              <img src={replyIcon} alt="reply" />
              Reply
            </button>
          ) : null}
          {user.username === commentObj.author.username ? (
            <button className="comment__edit" onClick={handleEdit}>
              <img src={editIcon} alt="edit" />
              Edit
            </button>
          ) : null}
        </div>

        <div className="comment__text-container">
          {isEditing ? (
            <EditForm setIsEditing={setIsEditing} commentToEdit={commentObj} />
          ) : (
            <p className="comment__text">
              {commentObj.commentText.split(" ").map((word) => {
                const regex = /^@[\w\d]+/g;
                if (regex.test(word)) {
                  return (
                    <span className="comment__text--highlight">{word} </span>
                  );
                }
                return `${word} `;
              })}
            </p>
          )}
        </div>
      </article>
      {isReplying ? <ReplyForm {...replyProps} /> : null}

      {replies.length > 0 ? (
        <div className="reply-section__container">
          <section className="reply-section">{replies}</section>
        </div>
      ) : null}
    </>
  );
}

export default CommentComp;
