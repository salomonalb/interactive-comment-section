import { useContext, useEffect, useState } from "react";
import { CurrentUser } from "../context/CurrentUser";
import { commentType } from "../types/commentType";
import { globalData } from "../context/globalData";
import EditForm from "./EditForm";
import ReplyForm from "./ReplyForm";
import DeleteModal from "./DeleteModal";
import Votes from "./Votes";
import Info from "./Info";
import Options from "./Options";


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

  return (
    <>
      <article className="comment">
        {isDeleting ? (
          <DeleteModal
            setIsDeleting={setIsDeleting}
            handleDeleteModal={handleDeleteModal}
          />
        ) : null}

        <Votes user={user} commentObj={commentObj} handleDownvote={handleDownvote} handleUpvote={handleUpvote}  />

        <Info user={user} commentObj={commentObj} />

        <Options user={user} commentObj={commentObj} 
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleReply={handleReply}
        />

        

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
