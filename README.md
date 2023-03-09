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
