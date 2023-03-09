import {
  FormEvent,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { globalData } from "../context/globalData";
import { commentType } from "../types/commentType";

type EditFormProps = {
  commentToEdit: commentType;
  setIsEditing: (isEditing: boolean) => void;
};

function EditForm({ commentToEdit, setIsEditing }: EditFormProps) {
  const [comment, setComment] = useState("");
  const { editComment, editReply } = useContext(globalData);

  const areaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setComment(commentToEdit.commentText);
    if (areaRef.current !== null) {
      areaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (areaRef.current !== null) {
      areaRef.current.style.height = `${areaRef.current.scrollHeight}px`;
    }
  }, [comment]);

  const parentAuthor = commentToEdit.parentId
    ? commentToEdit.commentText.match(/^@[\w\d]+/g)
    : null;

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    setComment(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (commentToEdit.parentId) {
      editReply({
        ...commentToEdit,
        commentText: `${parentAuthor} ${comment.replace(/^@[\w\d]+\s/g, "")}`,
      });
    } else {
      editComment({ ...commentToEdit, commentText: comment });
    }
    setIsEditing(false);
  }

  return (
    <form className="form --edit" onSubmit={handleSubmit}>
      <textarea
        ref={areaRef}
        className="form__input"
        title="edit comment"
        value={comment.replace(/^@[\w\d]+\s/g, "")}
        onChange={handleChange}
      />
      <button className="form__button">Update</button>
    </form>
  );
}

export default EditForm;
