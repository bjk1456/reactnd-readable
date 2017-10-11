import { combineReducers } from 'redux'


import {
  ADD_POST,
  CHANGE_SORT,
  CHANGE_FILTER,
} from '../actions'

function post (state = {}, action) {
  const { title, author, body, id, timestamp, category, voteScore, sorting } = action
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
        }
      }
    default :
        return state;
    }
  }

function sort (state = {sortMethod: "voteScore"}, action) {
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

function filter (state = {filterCat: "all"}, action) {
  const { filterCat } = action
  switch (action.type) {
    case CHANGE_FILTER :
     return {
     	...state,
     	  filterCat,   
     }
 default :
  return state;
 }
}

export default combineReducers({
  post,
  sort,
  filter,
})