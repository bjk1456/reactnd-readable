import {
  CHANGE_SORT
} from '../actions/types'

export function sort (state = {sortMethod: "voteScore"}, action) {
  const { sortMethod } = action
  switch (action.type) {
    case CHANGE_SORT :
     return {
      ...state,
        sortMethod,   
     }
 default :
  return state;
 }
}
export default sort