import { getTime } from "../functions/getTime";
import { commentType } from "../types/commentType";
import { user } from "../types/userType";

type InfoProps = {
  user: user;
  commentObj: commentType;
};

function Info({ user, commentObj }: InfoProps) {
  return (
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
  );
}

export default Info;
