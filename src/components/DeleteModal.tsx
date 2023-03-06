import {useState, useEffect} from "react"

type deleteModalProps = {
  setIsDeleting: (value: boolean) => void;
  handleDeleteModal: () => void;
};

function DeleteModal({ setIsDeleting, handleDeleteModal }: deleteModalProps) {
  
  const [isOpen, setIsOpen] = useState(true)
  
  function handleCancel() {
    setIsDeleting(false);
    setIsOpen(false)
  }
  function handleDeleteConfirmation() {
    handleDeleteModal()
    setIsOpen(false)
  }
  
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal__open");
    } else {
      document.body.classList.remove("modal__open");
    }
    return () => {
      document.body.classList.remove("modal__open");
    };
  }, [isOpen]);

  return (
    <div className="modal__background">
      <article className="modal__body">
        <h1 className="modal__title" >Delete comment</h1>
        <p className="modal__text">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <menu className="modal__menu">
          <li className="modal__menu-item">
            <button className="modal__button --cancel" onClick={handleCancel}>NO, CANCEL</button>
          </li>
          <li className="modal__menu-item">
            <button className="modal__button --delete" onClick={handleDeleteConfirmation}>YES, DELETE</button>
          </li>
        </menu>
      </article>
    </div>
  );
}

export default DeleteModal;
