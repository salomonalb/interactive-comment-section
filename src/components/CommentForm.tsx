import React, { FormEvent, useState, useContext } from "react";
import { nanoid } from "nanoid";
import { CurrentUser } from "../context/CurrentUser";
import { globalData } from "../context/globalData";

function CommentForm() {
  const [comment, setComment] = useState("");

  const user = useContext(CurrentUser);

  const { addComment } = useContext(globalData);

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
  }

  return (
    <form onSubmit={handleSubmit}>
      <img src={user.avatar} alt={user.username} />
      <textarea value={comment} onChange={handleChange} title="Comment" />
      <button>Send</button>
    </form>
  );
}

export default CommentForm;
