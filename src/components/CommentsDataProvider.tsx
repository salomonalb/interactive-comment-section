import { ReactNode, useContext, useReducer } from "react"
import { CommentsData } from "../context/CommentsData"
import { initialData } from "../context/CommentsData"
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

    const [state, dispatch] = useReducer(reducer, initialData)

    function addComment(comment: commentType) {
        dispatch({type: 'ADD_COMMENT', payload: comment })
    }
                                            //it seems like the intial data and the state returned
                                            //from useReducer are not the same
    return (
        <div>                            
            <CommentsData.Provider value={initialData}>
                {children}
            </CommentsData.Provider>
        </div>
    )
}

export default CommentsDataProvider