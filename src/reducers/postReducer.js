import {
  ADD_POST
} from '../actions/types'

export function post (state = {}, action) {
  const { title, author, body, id, timestamp, category, voteScore, deleted } = action
  switch (action.type) {
    case ADD_POST :
      return {
        ...state,
        [title] : {
        	author,
        	body,
        	id,
            timestamp,
            category,
            voteScore,
            deleted,
        }
      }
    default :
        return state;
    }
  }
export default post