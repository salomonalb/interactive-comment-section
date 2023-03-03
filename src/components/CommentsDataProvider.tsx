import { ReactNode, useContext, useReducer } from "react"
import { globalData } from "../context/globalData"
import { INITIAL_DATA } from "../constants/INITIAL_DATA"
import { actionType } from "../types/actionType"
import { commentType } from "../types/commentType"

type CommentsDataProviderProps = {
    children: ReactNode[]
}

function reducer(oldState: commentType[], action: actionType) {
    switch (action.type) {
        case 'ADD_COMMENT':
            return [...oldState, action.payload]

        case 'DELETE_COMMENT':
            return oldState.filter(comment => comment.id !== action.payload.id)

        case 'EDIT_COMMENT':
            return oldState.map(oldComment => {
                if (oldComment.id === action.payload.id) {
                    return {...oldComment, commentText: action.payload.commentText }
                } else {
                    return oldComment
                }
            })
        case 'UPVOTE_COMMENT': 
            return oldState.map(oldComment => {
            if (oldComment.id === action.payload.id) {
                return {...oldComment, votes: oldComment.votes + 1}
            } else {
                return oldComment
            }
        })
        case 'DOWNVOTE_COMMENT': 
            return oldState.map(oldComment => {
            if (oldComment.id === action.payload.id) {
                return {...oldComment, votes: oldComment.votes - 1}
            } else {
                return oldComment
            }
        }) 
        default:
            return oldState
    }
}


function CommentsDataProvider({children}: CommentsDataProviderProps) {

    const [state, dispatch] = useReducer(reducer, INITIAL_DATA)

    function addComment(comment: commentType) {
        dispatch({type: 'ADD_COMMENT', payload: comment })
    }

    function deleteComment(comment: commentType) {
        dispatch({type: 'DELETE_COMMENT', payload: comment})
    }

    function editComment(comment: commentType) {
        dispatch({type: 'EDIT_COMMENT', payload: comment})
    }

    function upvoteComment(comment: commentType) {
        dispatch({type: 'UPVOTE_COMMENT', payload: comment})
    }
    function downvoteComment(comment: commentType) {
        dispatch({type: 'DOWNVOTE_COMMENT', payload: comment})
    }

    return (
        <div>                            
            <globalData.Provider value={{
                data: state, 
                addComment: addComment,
                deleteComment: deleteComment,
                editComment: editComment,
                upvoteComment: upvoteComment,
                downvoteComment: downvoteComment
            }}>
                {children}
            </globalData.Provider>
        </div>
    )
}

export default CommentsDataProvider