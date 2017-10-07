
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


export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())

export const search = (query, maxResults) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, maxResults })
  }).then(res => res.json())
    .then(data => data.books)
