export const ADD_POST = 'ADD_POST'

export function addPost ({ title, author, body, id, timestamp }) {
  return {
    type: ADD_POST,
    title,
    author,
    body,
    id,
    timestamp,
  }
}