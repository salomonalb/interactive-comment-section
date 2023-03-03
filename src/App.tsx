import CurrentUserProvider from "./components/CurrentUserProvider"
import CommentForm from "./components/CommentForm"
import CommentsList from "./components/CommentsList"
import CommentsDataProvider from "./components/CommentsDataProvider"

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
