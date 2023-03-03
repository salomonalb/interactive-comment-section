import React, { FormEvent, useState, useContext } from 'react'
import { nanoid } from 'nanoid'
import { CurrentUser } from '../App'

function CommentForm() {

    const [comment, setComment] = useState('')  
    const user = useContext(CurrentUser)

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
        setComment(event.target.value)
    }
    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault()
        console.log({
            id: nanoid(),
            comment: comment,
            date: Date.now(),
            votes: 1,
            replies: [],
            author: {
                username: user.username,
                avatar: user.avatar,
            }
        })
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