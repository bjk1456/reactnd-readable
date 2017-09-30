import { combineReducers } from 'redux'

import {
  ADD_POST,
} from '../actions'

function post (state = {}, action) {
  const { title, author, body, id, timestamp } = action
  switch (action.type) {
    case ADD_POST :
      return {
        ...state,
        [title] : {
        	author,
        	body,
        	id,
            timestamp,
        }
      }
      default :
        return state
    }
  }

export default combineReducers({
  post,
})