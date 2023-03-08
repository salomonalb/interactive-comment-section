import React from 'react'
import { commentType } from '../types/commentType'
import { user } from '../types/userType'
import plusIcon from "../assets/images/icon-plus.svg";
import minusIcon from "../assets/images/icon-minus.svg";

type VotesProps = {
    user: user,
    commentObj: commentType,
    handleUpvote: ()=> void,
    handleDownvote: ()=> void
}

function Votes({user, commentObj, handleUpvote, handleDownvote}: VotesProps) {
  return (
    <div className="comment__votes-container">
          <button
            className="comment__upvote"
            onClick={
              user.username !== commentObj.author.username
                ? handleUpvote
                : undefined
            }
          >
            <img src={plusIcon} alt="upvote" />
          </button>

          <p className="comment__votes">{commentObj.votes}</p>

          <button
            className="comment__downvote"
            onClick={
              user.username !== commentObj.author.username
                ? handleDownvote
                : undefined
            }
          >
            <img src={minusIcon} alt="downvote" />
          </button>
        </div>
  )
}

export default Votes