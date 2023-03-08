import React from "react";
import { commentType } from "../types/commentType";
type TextProps = {
  commentObj: commentType;
};
function Text({ commentObj }: TextProps) {
  return (
    <p className="comment__text">
      {commentObj.commentText.split(" ").map((word) => {
        const regex = /^@[\w\d]+/g;
        if (regex.test(word)) {
          return <span className="comment__text--highlight">{word} </span>;
        }
        return `${word} `;
      })}
    </p>
  );
}

export default Text;
