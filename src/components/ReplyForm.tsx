import React, { FormEvent, useState, useContext } from "react";
import { nanoid } from "nanoid";
import { CurrentUser } from "../context/CurrentUser";
import { globalData } from "../context/globalData";

type ReplyFormProps = {
  parentId: string;
  parentAuthor: string;
  setIsReplying: (value: boolean) => void;
};

function ReplyForm({ parentId, parentAuthor, setIsReplying }: ReplyFormProps) {
  const [comment, setComment] = useState("");

  const user = useContext(CurrentUser);
  const { addReply } = useContext(globalData);

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    setComment(event.target.value);
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    addReply({
      parentId: parentId,
      id: nanoid(),
      commentText: `@${parentAuthor} ${comment}`,
      date: Date.now(),
      votes: 1,
      replies: [],
      author: {
        username: user.username,
        avatar: user.avatar,
      },
    });

    setComment("");
    setIsReplying(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <img src={user.avatar} />
      <textarea value={comment} onChange={handleChange} />
      <button>Send</button>
      Replying to @{parentAuthor}
    </form>
  );
}

export default ReplyForm;
