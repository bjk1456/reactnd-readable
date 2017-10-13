import * as PostsAPI from '../utils/PostsAPI'
export const ADD_POST = 'ADD_POST'
export const CHANGE_SORT = 'CHANGE_SORT'
export const CHANGE_FILTER = 'CHANGE_FILTER'
export const ADD_COMMENT = 'ADD_COMMENT'

export function addPost ({ title, author, body, id, timestamp, category, voteScore, deleted }) {
  return {
    type: ADD_POST,
    title,
    author,
    body,
    id,
    timestamp,
    category,
    voteScore,
    deleted,
  }
}

export function addComment ({ title, author, body, id, timestamp, category, voteScore, deleted, parentDeleted, parentId, }) {
  return {
    type: ADD_COMMENT,
    title,
    author,
    body,
    id,
    timestamp,
    category,
    voteScore,
    deleted,
    parentDeleted,
    parentId,
  }
}

export function changeSort ({ sortMethod }) {
    return {
      type: CHANGE_SORT,
      sortMethod,
    }
}

export function changeFilter ({ filterCat }) {
    return {
      type: CHANGE_FILTER,
      filterCat,
    }
}
/**
export function loadPosts(category) {
	return (dispatch) => {
		
	}
}

PostsAPI.getPostsCategory(this.props.match.params.cat).then((posts) => {
  	  if(posts !== undefined) {
  	    posts.map((post, None) =>
  	      this.props.submitPost({ title: post['title'], author: post['author'], body: post['body'], id: post['id'], timestamp: post['timestamp'], category: post['category'] }))
  	}})


export function postsFetchData(category) {
    return (dispatch) => {
      PostsAPI.getPostsCategory(category).then((posts) => {
  	    if(posts !== undefined) {
          dispatch()
  	      posts.map((post, None) =>

  	  	  console.log("The post is " + post['body']))
  	  }})

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(itemsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(itemsFetchDataSuccess(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(itemsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(itemsFetchDataSuccess(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}
*/