import {
  FormEvent,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
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
  const areaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (areaRef.current !== null) {
      areaRef.current.focus();
    }
  }, []);

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
    <form className="form --reply" onSubmit={handleSubmit}>
      <img className="form__avatar" src={user.avatar} alt={user.username} />
      <textarea
        ref={areaRef}
        className="form__input"
        title="reply"
        value={comment.replace(/^@[\w\d]+\s/g, "")}
        onChange={handleChange}
      />
      <button className="form__button">Reply</button>
    </form>
  );
}

export default ReplyForm;
