import { useContext, useEffect, useState } from "react"
import { CurrentUser } from "../context/CurrentUser"
import { commentType } from "../types/commentType"
import { globalData } from "../context/globalData"
import EditForm from "./EditForm"

type commentProps = {
    commentObj: commentType
}

function CommentComp({commentObj}: commentProps) {
    

    const [isEditing, setIsEditing] = useState(false)


    const replies = commentObj.replies.map(reply => {
        return <CommentComp key={reply.id} commentObj={reply} />
    })

    const user = useContext(CurrentUser)
    const { deleteComment, upvoteComment, downvoteComment } = useContext(globalData)

    function handleDelete() {
        deleteComment(commentObj)
    }
    function handleEdit() {
        setIsEditing(prevIsEditing => !prevIsEditing)
    }
    function handleUpvote() {
        upvoteComment(commentObj)
    }
    function handleDownvote() {
        downvoteComment(commentObj)
    }

    useEffect(() => {
        setIsEditing(false)
    }, [user])

    return (
        <article>
            <hr />

            {
                user.username === commentObj.author.username
                ? <button onClick={handleDelete}>Delete This Comment</button>
                : null
            }

            {
                user.username === commentObj.author.username
                ? <button onClick={handleEdit}>{isEditing ? "Editing" : "Edit This Comment"}</button>
                : null
            }

            {
                user.username !== commentObj.author.username
                ? <button>Reply to This Comment</button>
                : null
            }

            {
                user.username !== commentObj.author.username
                ? <button onClick={handleUpvote}>Arrivoto</button>
                : null
            }

            {
                user.username !== commentObj.author.username
                ? <button onClick={handleDownvote}>bajivoto</button>
                : null
            }

            <p>{commentObj.votes}</p>
            <p>{commentObj.author.username}</p>
            <p><img src={commentObj.author.avatar} /></p>
            
            {
                isEditing 
                ? <EditForm setIsEditing={setIsEditing} commentToEdit={commentObj} /> 
                : <p>{commentObj.commentText}</p>
            }
            
            
            <p>{commentObj.date}</p>
            <p>{commentObj.id}</p>
            <div style={{paddingLeft: '100px'}}>
                {replies}
            </div>
        </article>
    )
}

export default CommentComp