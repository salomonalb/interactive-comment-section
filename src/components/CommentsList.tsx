import { useContext } from "react"
import { globalData } from "../context/globalData"
import CommentComp from "./CommentComp"


function CommentsList() {
    
    const {data} = useContext(globalData)
    const commentComponents = data.map(commentObj => {
        return <CommentComp key={commentObj.id} commentObj={commentObj} />
    })

    return (
    <div>
        {commentComponents}
    </div>
    )
}

export default CommentsList