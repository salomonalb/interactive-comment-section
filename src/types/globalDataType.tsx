import { commentType } from "./commentType"

export type globalDataType = {
    data: commentType[],
    addComment: (comment: commentType) => void
}