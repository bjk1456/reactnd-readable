import * as ReadsAPI from '../utils/ReadsAPI';
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

export function loadPosts() {
  return function(dispatch) {
    return  ReadsAPI.getAllPosts().then((posts) => {
            posts.map((post) => {
                dispatch(addPost({
                    title: post['title'],
                    author: post['author'],
                    body: post['body'],
                    id: post['id'],
                    timestamp: post['timestamp'],
                    category: post['category'],
                    voteScore: post['voteScore'],
                    deleted: post['deleted']
                }))
                ReadsAPI.getCommentsPost(post['id']).then((comments) => {
                    comments.map((comment) => {
                    dispatch(addComment({
                        title: comment['title'],
                        author: comment['author'],
                        body: comment['body'],
                        id: comment['id'],
                        timestamp: comment['timestamp'],
                        category: comment['category'],
                        voteScore: comment['voteScore'],
                        deleted: comment['deleted'],
                        parentDeleted: comment['parentDeleted'],
                        parentId: comment['parentId']
                    }))
                })
              })
            })
        }).catch(error => {
      throw(error);
    });
  }
}
