const backendURL = "https://reactnd-books-api.udacity.com";

let token = localStorage.token;
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token,
};

export const getByID = (bookId) =>
  fetch(`${backendURL}/books/${bookId}`, { headers })
    .then((res) => res.json())
    .then((data) => data.book);

export const all = () =>
  fetch(`${backendURL}/books`, { headers })
    .then((res) => res.json())
    .then((data) => data.books);

export const setBookShelf = (book, shelf) =>
  fetch(`${backendURL}/books/${book.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shelf }),
  }).then((res) => res.json());

export const search = (query, maxResults) =>
  fetch(`${backendURL}/search`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, maxResults }),
  })
    .then((res) => res.json())
    .then((data) => data.books);
