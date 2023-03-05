type deleteModalProps = {
    setIsDeleting: (value: boolean)=> void,
    handleDeleteModal: ()=> void
}
function DeleteModal({ setIsDeleting, handleDeleteModal}: deleteModalProps) {

    function handleCancel() {
        setIsDeleting(false)
    }

  return (
    <div>
        <article>
            <h1>Delete Comment</h1>
            <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.
            </p>
            <menu>
                <li><button onClick={handleCancel}>NO, CANCEL</button></li>
                <li><button onClick={handleDeleteModal}>YES, DELETE</button></li>
            </menu>
        </article>
    </div>
  )
}

export default DeleteModal