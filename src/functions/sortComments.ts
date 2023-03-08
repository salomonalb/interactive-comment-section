import { commentType } from "../types/commentType";

export default function sortComments(commentsArray: commentType[]) {
  const newCommentsArray = [...commentsArray];
  newCommentsArray.sort((a, b) => b.votes - a.votes);
  return newCommentsArray;
}
