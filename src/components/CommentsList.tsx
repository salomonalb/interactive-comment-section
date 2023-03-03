import { useContext } from "react"
import { CommentsData } from "../context/CommentsData"
import CommentComp from "./CommentComp"


function CommentsList() {
                            //this can read the data that comes from intial data but not from
                            //state that comes from useReducer
    const list = useContext(CommentsData)
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