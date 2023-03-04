import { user } from "./userType";

export type commentType = {
  parentId: string | null,
  id: string;
  commentText: string;
  date: number;
  votes: number;
  author: user;
  replies: commentType[];
};
