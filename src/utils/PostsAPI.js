
const api = "http://localhost:3001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCats = () =>
  fetch(`${api}/categories`, {
    method: 'GET',
    headers: {
     ...headers,
     'Content-Type': 'application/json'
    },
  }).then(res => res.json())
    .then(data => data.categories)

export const post = (title, author, body, id, timestamp, category) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, author, body, id, timestamp, category })
  }).then(res => res.json())

export const comment = (parentId, author, body, id, timestamp) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ parentId, author, body, id, timestamp })
  }).then(res => res.json())

export const getPostsCategory = (category) =>
  fetch(`${api}/${category}/posts`, {
    method: 'GET',
    headers: {
     ...headers,
     'Content-Type': 'application/json'
    },
  }).then(res => res.json())

export const getAllPosts = () =>
  fetch(`${api}/posts`, { 
    method: 'GET',
    headers: {
     ...headers,
     'Content-Type': 'application/json'
    },
  }).then(res => res.json())

export const vote = (id, readType, option) =>
  fetch(`${api}/${readType}/${id}`, {
    method: 'POST',
    headers: {
     ...headers,
     'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json())

export const deleteRead = (id, readType) =>
  fetch(`${api}/${readType}/${id}`, {
    method: 'DELETE',
    headers: {
     ...headers,
     'Content-Type': 'none'
    },
  }).catch(error => console.log(error));

export const getCommentsPost = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, {
    method: 'GET',
    headers: {
     ...headers,
     'Content-Type': 'application/json'
    },
  }).then(res => res.json())

export const updatePost = (id, title, body) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
     ...headers,
     'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, body })
  }).catch(error => console.log(error));

export const updateComment = (id, timestamp, body) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
     ...headers,
     'Content-Type': 'application/json'
    },
    body: JSON.stringify({ timestamp, body })
  }).catch(error => console.log(error));
