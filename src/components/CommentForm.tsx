import { FormEvent, useState, useContext, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import { CurrentUser } from "../context/CurrentUser";
import { globalData } from "../context/globalData";

function CommentForm() {
  const [comment, setComment] = useState("");

  const user = useContext(CurrentUser);

  const { addComment } = useContext(globalData);

  const areaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (areaRef.current !== null) {
      areaRef.current.style.height = `${areaRef.current.scrollHeight}px`;
    }
  }, [comment]);

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    setComment(event.target.value);
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    addComment({
      parentId: null,
      id: nanoid(),
      commentText: comment,
      date: Date.now(),
      votes: 1,
      replies: [],
      author: {
        username: user.username,
        avatar: user.avatar,
      },
    });

    setComment("");
    if (areaRef.current !== null) {
      areaRef.current.style.height = `10rem`;
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <img className="form__avatar" src={user.avatar} alt={user.username} />
      <textarea
        ref={areaRef}
        placeholder="Add a Comment..."
        className="form__input"
        value={comment}
        onChange={handleChange}
        title="Comment"
      />
      <button className="form__button">
        <p>Send</p>
      </button>
    </form>
  );
}

export default CommentForm;
