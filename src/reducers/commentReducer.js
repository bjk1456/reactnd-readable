import {
  ADD_COMMENT
} from '../actions/types'

export function comment (state = {}, action) {
  const { author, body, id, timestamp, category, voteScore, deleted, parentDeleted, parentId } = action
  switch (action.type) {
    case ADD_COMMENT :
      return {
        ...state,
        [id] : {
        	author,
        	body,
            timestamp,
            category,
            voteScore,
            deleted,
            parentDeleted,
            parentId,
            id,
        }
      }
    default :
        return state;
    }
  }
export default comment