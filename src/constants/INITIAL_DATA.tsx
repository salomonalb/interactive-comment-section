import { nanoid } from "nanoid";
import { commentType } from "../types/commentType";
import { USERS_ARRAY } from "./USERS_ARRAY";

export const INITIAL_DATA: commentType[] = [
  {
    parentId: null,
    id: nanoid(),
    commentText:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    votes: 12,
    author: USERS_ARRAY[0],
    date: Date.parse("03 Feb 2023 03:20:10 GMT"),
    replies: [],
  },
  {
    parentId: null,
    id: nanoid(),
    commentText:
      "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    votes: 11,
    author: USERS_ARRAY[1],
    date: Date.parse("07 Nov 2022 03:20:10 GMT"),
    replies: [],
  },
];
