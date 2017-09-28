export const ADD_POST = 'ADD_POST'

export function addPost ({ title, author, body }) {
  return {
    type: ADD_POST,
    title,
    author,
    body,
  }
}