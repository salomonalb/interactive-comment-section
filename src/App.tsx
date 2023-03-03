import CurrentUserProvider from "./components/CurrentUserProvider"
import CommentForm from "./components/CommentForm"
import CommentsList from "./components/CommentsList"
import CommentsDataProvider from "./components/CommentsDataProvider"


// now the context should have the array, and the functions to modify that array

export function App() {

  return (
    <>
      <CurrentUserProvider>
        <CommentsDataProvider>
          <CommentsList/>
          <CommentForm />
        </CommentsDataProvider>
      </CurrentUserProvider>
    </>
  )
}
