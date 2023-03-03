import React, { FormEvent, useState, useContext } from 'react'
import { nanoid } from 'nanoid'
import { CurrentUser } from '../context/CurrentUser'
import { commentsData } from '../context/staticCommentsTest'

function CommentForm() {

    const [comment, setComment] = useState('')  
    const user = useContext(CurrentUser)

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
        setComment(event.target.value)
    }
    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault()

        commentsData.push({
            id: nanoid(),
            commentText: comment,
            date: Date.now(),
            votes: 1,
            replies: [],
            author: {
                username: user.username,
                avatar: user.avatar,
            }
        })

        console.log(commentsData)
    }

    return (
        <form onSubmit={handleSubmit}>
            <img src={user.avatar} />
            <textarea value={comment} onChange={handleChange}/>
            <button>
                Send
            </button>
        </form>
    )
}

export default CommentForm