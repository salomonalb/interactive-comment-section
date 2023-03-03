import { useContext } from "react"
import { CurrentUser } from "../context/CurrentUser"
import { commentType } from "../types/commentType"
import { globalData } from "../context/globalData"

type commentProps = {
    commentObj: commentType
}

function CommentComp({commentObj}: commentProps) {
    
    const replies = commentObj.replies.map(reply => {
        return <CommentComp key={reply.id} commentObj={reply} />
    })
    const user = useContext(CurrentUser)
    const { deleteComment } = useContext(globalData)

    function handleClick() {
        deleteComment(commentObj)
    }

    return (
        <article>
            <hr />
            {user.username === commentObj.author.username
            ? <button onClick={handleClick}>Delete This Comment</button>
            : null}
            <p>{commentObj.votes}</p>
            <p>{commentObj.author.username}</p>
            <p><img src={commentObj.author.avatar} /></p>
            <p>{commentObj.commentText}</p>
            <p>{commentObj.date}</p>
            <p>{commentObj.id}</p>
            <div style={{paddingLeft: '100px'}}>
                {replies}
            </div>
        </article>
    )
}

export default CommentComp