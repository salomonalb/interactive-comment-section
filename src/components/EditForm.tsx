import React, { FormEvent, useState, useContext, useEffect } from 'react'
import { globalData } from '../context/globalData'
import { commentType } from '../types/commentType'

type EditFormProps = {
    commentToEdit: commentType,
    setIsEditing: (isEditing: boolean)=> void
}

function EditForm({ commentToEdit, setIsEditing }: EditFormProps) {

    const [comment, setComment] = useState('')  
    const { editComment } = useContext(globalData)
    
    useEffect(() => {
        setComment(commentToEdit.commentText)
    }, [])

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
        setComment(event.target.value)
    }
    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault()
        editComment({...commentToEdit, commentText: comment})
        setIsEditing(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            Edit
            <textarea value={comment} onChange={handleChange}/>
            <button>
                Send
            </button>
        </form>
    )
}

export default EditForm