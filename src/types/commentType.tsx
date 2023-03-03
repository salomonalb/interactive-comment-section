import { user } from "./userType"

export type commentType = {
    id: string,
    commentText: string,
    date: number,
    votes:  number,
    author: user
    replies: commentType[]
}