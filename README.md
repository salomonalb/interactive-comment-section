# interactive-comment-section
Interactive Comment Section is a project built on the CRUD pattern, allowing users to perform standard operations such as creating new comments, 
replying to existing ones, and editing their own comments. In addition, users can upvote and downvote comments made by other users, and a sorting 
algorithm ensures that the most popular comments appear at the top of the main thread.

This project also includes the ability for users to switch between four different users, each with their own unique handle. Each user can create new comments and 
replies, edit their own contributions, and upvote and downvote comments made by other users. The app is designed to ensure that users cannot edit or delete someone
else's comments or replies.

To prevent accidental deletion of comments, the project includes an extra layer of protection in the form of a modal window that pops up to confirm the user's 
intentions before a comment is deleted.

The state of the app is saved and remembered in the browser, so users can refresh the page, close the browser,
or even shut down their computer, and their comments will still be present when they return.

This project is built using React.js, TypeScript, and SCSS, with Vite serving as the build tool. For generating unique IDs for comments, I opted to use the nanoid package.

In order to grant components access to the current user information, I utilized the Context API and useContext hook. Moreover, I implemented the useReducer and Context API in tandem to create a context where the state and functions for managing comments, replies, edits, deletes, votes, and the sorting algorithm are available.

The reducer function is built upon array methods such as map(), filter(), and sort().

To track editing, deletion, and reply states within the comment component, I implemented the useState hook. Additionally, useRef was utilized to create a reference to the textarea and automatically give it focus when edit and reply components are rendered.

Furthermore, the useEffect hook was leveraged to deactivate the delete, reply, or edit state when users change.

By passing data and functions to its subcomponents via props, the comment component allows the Votes component to render the vote count and the upvote/downvote buttons, the Info component to display the username, avatar, and date of the comment, and the Options component to render the reply button, or the delete and edit options if the user owns the comment.

In order to highlight usernames in comments, the Text component splits the comment text and maps through each word, returning a JSX element if a word matches a regular expression beginning with @.

To preserve the state of the application, I implemented the useEffect hook to save the state to localStorage every time it changes.
