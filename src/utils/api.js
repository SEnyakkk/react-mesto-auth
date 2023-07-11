export class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }
  _isResOk = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)

  _request(endpoint, options, url = this._url) {
    return fetch(`${url}${endpoint}`, options)
      .then(this._isResOk)
  }

  getInfo() {
    return this._request(`/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
  }

  getInitialCards() {
    return this._request(`/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
  }

  setUserInfo(data) {
    return this._request(`/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
  }

  setAvatar(data) {
    return this._request(`/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
  }

  addCard(data) {
    return this._request(`/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
  }

  addlike(cardid) {
    return this._request(`/cards/${cardid}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization
      }
    })
  }

  removelike(cardid) {
    return this._request(`/cards/${cardid}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
  }

  removeCard(cardid) {
    return this._request(`/cards/${cardid}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
  }

}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '03443a56-2e96-4faf-ad23-ecb69850558d',
    'Content-Type': 'application/json'
  }
});
