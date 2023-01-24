import { BASE_URL } from '../utils/constants';
const token = () => localStorage.getItem('jwt');

function getResponse(res) {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject({message: err.message, status: res.status}))
}

  // Получение сохраненных сообщений
export const getUsersMessages = () => {
  return fetch(`${BASE_URL}/messages`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token()}`,
      'Content-Type': 'application/json'
    }
  })
  .then((res) => {
    return getResponse(res)
  });
}

  // Сохраненение пользователем фильма
export const saveNewMessage = (message, author) => {
  return fetch(`${BASE_URL}/messages`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: message, author})
  })
  .then((res) => {
    return getResponse(res)
  });
}

  // Получение данных о пользователе
export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token()}`,
      'Content-Type': 'application/json'
    }
  })
  .then((res) => {
    return getResponse(res)
  });
}

export const register = (name, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, password})
  })
  .then((res) => {
    // console.log(res) // Response {type: 'cors', url: 'https://auth.nomoreparties.co/signup', redirected: false, status: 201, ok: true,
    return getResponse(res)
  })
};

export const login = (name, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, password})
  })
  .then((res) => {
    return getResponse(res)
  })
}

export const verifyToken = (token) => {
  // console.log(`токен из LocalStorage ${token}`)
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
  .then((res) => {
    return getResponse(res)
  })
}