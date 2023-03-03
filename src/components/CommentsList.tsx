import { commentType } from "../context/commentType"
import CommentComp from "./CommentComp"

type CommentsListProps = {
    list: commentType[]
}

function CommentsList({list}: CommentsListProps) {

    const commentComponents = list.map(commentObj => {
        return <CommentComp key={commentObj.id} commentObj={commentObj} />
    })

    return (
    <div>
        {commentComponents}
    </div>
    )
}

export default CommentsList