import CurrentUserProvider from "./components/CurrentUserProvider"
import CommentForm from "./components/CommentForm"
import CommentsList from "./components/CommentsList"
import { commentsData } from "./context/staticCommentsTest"

export function App() {

  return (
    <>
      <CurrentUserProvider>
        <CommentsList list={commentsData} />
        <CommentForm />
      </CurrentUserProvider>
    </>
  )
}
