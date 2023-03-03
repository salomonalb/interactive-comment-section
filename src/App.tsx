import CurrentUserProvider from "./components/CurrentUserProvider"
import CommentForm from "./components/CommentForm"

export function App() {

  return (
    <>
      <CurrentUserProvider>
        <CommentForm />
        <CommentForm />
      </CurrentUserProvider>
    </>
  )
}
