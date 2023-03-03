import { commentType } from "../context/commentType"

type commentProps = {
    commentObj: commentType
}

function CommentComp({commentObj}: commentProps) {
    
    const replies = commentObj.replies.map(reply => {
        return <CommentComp key={reply.id} commentObj={reply} />
    })
    
    return (
        <article>
            <p>{commentObj.votes}</p>
            <p>{commentObj.author.username}</p>
            <p><img src={commentObj.author.avatar} /></p>
            <p>{commentObj.commentText}</p>
            <p>{commentObj.date}</p>
            <p>{commentObj.id}</p>
            {replies}
        </article>
    )
}

export default CommentComp