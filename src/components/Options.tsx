import replyIcon from "../assets/images/icon-reply.svg";
import deleteIcon from "../assets/images/icon-delete.svg";
import editIcon from "../assets/images/icon-edit.svg";
import { user } from "../types/userType";
import { commentType } from "../types/commentType";

type OptionsProps = {
    user: user,
    commentObj: commentType,
    handleDelete: ()=> void,
    handleReply: ()=> void,
    handleEdit: ()=> void,
}

function Options({user, commentObj, handleDelete, handleReply, handleEdit }: OptionsProps) {
  return (
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
  )
}

export default Options