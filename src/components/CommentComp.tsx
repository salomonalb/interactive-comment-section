import { useContext, useEffect, useState } from "react";
import { CurrentUser } from "../context/CurrentUser";
import { commentType } from "../types/commentType";
import { globalData } from "../context/globalData";
import EditForm from "./EditForm";
import ReplyForm from "./ReplyForm";
import DeleteModal from "./DeleteModal";
import plusIcon from "../assets/images/icon-plus.svg"
import minusIcon from "../assets/images/icon-minus.svg"

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

  return (
    <article className="comment">

      {isDeleting ? (
        <DeleteModal
          setIsDeleting={setIsDeleting}
          handleDeleteModal={handleDeleteModal}
        />
      ) : null}

      <div className="comment__votes-container">

        {user.username !== commentObj.author.username ? (
          <button className="comment__upvote" onClick={handleUpvote}>
            <img src={plusIcon} alt="upvote" />
          </button>
        ) : <button className="comment__upvote">
              <img src={plusIcon} alt="upvote" />
            </button>}

        <p className="comment__votes">{commentObj.votes}</p>

        {user.username !== commentObj.author.username ? (
          <button className="comment__downvote" onClick={handleDownvote}>
            <img src={minusIcon} alt="downvote" />
          </button>
        ) : <button className="comment__downvote">
            <img src={minusIcon} alt="downvote" />
          </button>}

      </div>

      <div>
        <p>
          <img src={commentObj.author.avatar} alt={commentObj.author.username}  />
        </p>
        <address>
          <p>{commentObj.author.username}</p>
          {user.username === commentObj.author.username ? <span>You</span> : null}
        </address>
        <p>{commentObj.date}</p>
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

      <section  style={{ paddingLeft: "100px" }}>{replies}</section>
    </article>
  );
}

export default CommentComp;
