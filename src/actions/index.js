import * as PostsAPI from '../utils/PostsAPI'
export const ADD_POST = 'ADD_POST'

export function addPost ({ title, author, body, id, timestamp, category }) {
  return {
    type: ADD_POST,
    title,
    author,
    body,
    id,
    timestamp,
    category,
  }
}

export function dataInitLoad(bool) {
    return {
        type: 'INITIAL_LOAD',
        initLoad: bool
    };
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