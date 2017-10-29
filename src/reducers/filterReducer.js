import {
  CHANGE_FILTER
} from '../actions/types'

export function filter (state = {filterCat: "all"}, action) {
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

export default filter