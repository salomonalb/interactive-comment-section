import { nanoid } from "nanoid";
import { commentType } from "./commentType";
import { usersArray } from "./usersArray";


export const commentsData: commentType[] = [
    {
        id: nanoid(),
        commentText: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        votes: 12,
        author: usersArray[0],
        date: Date.parse("03 Feb 2023 03:20:10 GMT"),
        replies: []
    },
    {
        id: nanoid(),
        commentText: "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        votes: 5,
        author: usersArray[1],
        date: Date.parse("07 Nov 2022 03:20:10 GMT"),
        replies: [
            {
                id: nanoid(),
                commentText: "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
                votes: 4,
                author: usersArray[2],
                date: Date.parse("24 Feb 2023 03:20:10 GMT"),
                replies: []
            },
            {
                id: nanoid(),
                commentText: "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
                votes: 2,
                author: usersArray[3],
                date: Date.parse("01 Mar 2023 03:20:10 GMT"),
                replies: []
            }
        ]
    }
]

