const BASE_URL = "https://basic-book-crud-e3u54evafq-et.a.run.app";

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function putAccessToken(accessToken) {
  return localStorage.setItem("accessToken", accessToken);
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
      Accept: "application/json",
    },
  });
}

async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();
  if (!responseJson.token) {
    alert(responseJson.message);
    return { error: true, data: responseJson };
  }

  return { error: false, data: responseJson };
}

async function logout() {
  const response = await fetchWithToken(`${BASE_URL}/api/user/logout`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

async function register({ name, email, password, password_confirmation }) {
  const response = await fetch(`${BASE_URL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ name, email, password, password_confirmation }),
  }).catch((error) => {});

  const responseJson = await response.json();

  if (responseJson.message === "User created") {
    alert(responseJson.message);
    return { error: true, response: responseJson };
  } else {
    alert(responseJson.message);
    return { error: false, response: responseJson };
  }
}

async function getUserLogged() {
  const response = await fetchWithToken(`${BASE_URL}/api/user`);
  const responseJson = await response.json();

  if (responseJson.message === "Unauthenticated.") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson };
}

async function addBook({
  isbn,
  title,
  subtitle,
  author,
  published,
  publisher,
  pages,
  description,
  website,
}) {
  const response = await fetchWithToken(`${BASE_URL}/api/books/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isbn,
      title,
      subtitle,
      author,
      published,
      publisher,
      pages,
      description,
      website,
    }),
  });

  const responseJson = await response.json();

  if (responseJson.errors) {
    return { error: true, data: responseJson };
  }

  return { error: false, data: responseJson.data };
}

async function getBooks(currentPage) {
  const response = await fetchWithToken(
    `${BASE_URL}/api/books?page=${currentPage}`
  );
  const responseJson = await response.json();

  if (!responseJson.data) {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson };
}

async function getBook(id) {
  const response = await fetchWithToken(`${BASE_URL}/api/books/${id}`);
  const responseJson = await response.json();

  if (responseJson.message) {
    if (response.status === 404) {
      return { error: true, data: { message: "Book with this ID not found" } };
    }
    return { error: true, data: responseJson };
  }

  return { error: false, data: responseJson };
}

async function deleteBook(id) {
  const response = await fetchWithToken(`${BASE_URL}/api/books/${id}`, {
    method: "DELETE",
  });

  const responseJson = await response.json();

  if (responseJson.message) {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson };
}

async function updateBook({
  isbn,
  title,
  subtitle,
  author,
  published,
  publisher,
  pages,
  description,
  website,
  id,
}) {
  const response = await fetchWithToken(`${BASE_URL}/api/books/${id}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isbn,
      title,
      subtitle,
      author,
      published,
      publisher,
      pages,
      description,
      website,
    }),
  });

  const responseJson = await response.json();

  if (responseJson.errors) {
    return { error: true, data: responseJson };
  }

  return { error: false, data: responseJson.data };
}

export {
  login,
  register,
  getAccessToken,
  putAccessToken,
  getUserLogged,
  addBook,
  getBooks,
  getBook,
  deleteBook,
  updateBook,
  logout,
};
