import React, { FormEvent, useState } from 'react'
import { nanoid } from 'nanoid'

function CommentForm() {

    const [comment, setComment] = useState('')  

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
                username: 'miguel',
                avatar: 'si'
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={comment} onChange={handleChange}/>
            <button>
                Send
            </button>
        </form>
    )
}

export default CommentForm