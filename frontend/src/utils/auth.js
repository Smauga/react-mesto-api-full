export const BASE_URL = 'https://api.mesto.smauga.nomoredomains.xyz';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include',
    body: JSON.stringify({ password: password, email: email })
  })
    .then((response) => {
      if (response.ok) return response.json();
      return Promise.reject(`Ошибка: ${response.status}`);
    });
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ password: password, email: email })
  })
    .then((response) => {
      if (response.ok) return response.json();
      return Promise.reject(`Ошибка: ${response.status}`);
    });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then((response) => {
      if (response.ok) return response.json();
      return Promise.reject(`Ошибка: ${response.status}`);
    });
}
