import { combineReducers } from 'redux'
import {post} from './postReducer'; 
import {filter} from './filterReducer'; 
import {comment} from './commentReducer'; 
import {sort} from './sortReducer'; 

export default combineReducers({
  post,
  sort,
  filter,
  comment,
})