const serverAddress = 'https://api.mesto.smauga.nomoredomains.xyz';
const userToken = '96c866eb-92a9-4140-92ff-b1afa5e1671b';

class Api {
  constructor({ address, token }) {
    this._address = address;
    this._token = token;
  }

  _handleResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Получить карточки
  getCards() {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => this._handleResponse(res));
  }

  // Добавить карточку
  addCard({ name, link }) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
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
  setUserAvatar({ avatar }) {
    return fetch(`${this._address}/users/me/avatar `, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => this._handleResponse(res));
  }

  // Получить информацию о юзере
  getUserData() {
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => this._handleResponse(res));
  }

  // Изменить информацию о юзере
  setUserData({ name, about }) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
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
  deleteCard({ _id }) {
    return fetch(`${this._address}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then(res => this._handleResponse(res));
  }

  // Изменение лайка
  changeLikeCardStatus(id, noLike) {
    if (noLike) {
      return fetch(`${this._address}/cards/${id}/likes`, {
        method: 'PUT',
        headers: {
          authorization: this._token
        }
      })
        .then(res => this._handleResponse(res));
    }
    else {
      return fetch(`${this._address}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: this._token
        }
      })
        .then(res => this._handleResponse(res));
    }

  }
}

export default new Api({ address: serverAddress, token: userToken });