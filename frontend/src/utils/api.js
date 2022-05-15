const serverAddress = 'https://api.mesto.smauga.nomoredomains.xyz';

class Api {
  constructor({ address }) {
    this._address = address;
  }

  _handleResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Получить карточки
  getCards(token) {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(res => this._handleResponse(res));
  }

  // Добавить карточку
  addCard({ name, link }, token) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => this._handleResponse(res));
  }

  // Изменить аватар
  setUserAvatar({ avatar }, token) {
    return fetch(`${this._address}/users/me/avatar `, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => this._handleResponse(res));
  }

  // Получить информацию о юзере
  getUserData(token) {
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(res => this._handleResponse(res));
  }

  // Изменить информацию о юзере
  setUserData({ name, about }, token) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => this._handleResponse(res));
  }

  // Удалить карточку
  deleteCard({ _id }, token) {
    return fetch(`${this._address}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(res => this._handleResponse(res));
  }

  // Изменение лайка
  changeLikeCardStatus(id, noLike, token) {
    if (noLike) {
      return fetch(`${this._address}/cards/${id}/likes`, {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${token}`
        }
      })
        .then(res => this._handleResponse(res));
    }
    else {
      return fetch(`${this._address}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${token}`
        }
      })
        .then(res => this._handleResponse(res));
    }

  }
}

export default new Api({ address: serverAddress });