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
        default:
            return oldState
    }
}


function CommentsDataProvider({children}: CommentsDataProviderProps) {

    const [state, dispatch] = useReducer(reducer, INITIAL_DATA)

    function addComment(comment: commentType) {
        dispatch({type: 'ADD_COMMENT', payload: comment })
    }

    return (
        <div>                            
            <globalData.Provider value={{data: state, addComment: addComment}}>
                {children}
            </globalData.Provider>
        </div>
    )
}

export default CommentsDataProvider