import React, { FormEvent, useState, useContext } from "react";
import { nanoid } from "nanoid";
import { CurrentUser } from "../context/CurrentUser";
import { globalData } from "../context/globalData";

type ReplyFormProps = {
    parentId: string,
    setIsReplying: (value: boolean)=> void
}
function ReplyForm({parentId, setIsReplying}: ReplyFormProps) {
   const [comment, setComment] = useState("");

  const user = useContext(CurrentUser);
  
  /*
  const { replyToComment } = useContext(globalData);
    */
  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    setComment(event.target.value);
  }
  /*
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    replyToComment({
      parentId: parentId,
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
 */
  return (
    <form /* onSubmit={handleSubmit} */>
        
      <img  src={user.avatar} />
      <textarea value={comment} onChange={handleChange}/>
      <button>Send</button>
      Replying to {parentId}
    </form>
  );
}

export default ReplyForm;
