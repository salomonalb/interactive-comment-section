import { commentType } from "../types/commentType";

type TextProps = {
  commentObj: commentType;
};

function Text({ commentObj }: TextProps) {
  const text = commentObj.commentText.split(" ").map((word) => {
    const regex = /^@[\w\d]+/g;

    if (regex.test(word)) {
      return <span className="comment__text--highlight">{word} </span>;
    }
    return `${word} `;
  });

  return <p className="comment__text">{text}</p>;
}

export default Text;
