export class Api {
  constructor(options) {
    this._url = options.baseUrl;
    // this._headers = options.headers;
    // this._authorization = options.headers.authorization;
  }
  _isResOk = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)

  _request(endpoint, options, url = this._url) {
    return fetch(`${url}${endpoint}`, options)
      .then(this._isResOk)
  }

  getInfo(token) {
    return this._request(`/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  getInitialCards(token) {
    return this._request(`/cards`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
  }

  setUserInfo(data, token) {
    return this._request(`/users/me`, {
      method: 'PATCH',
      headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
  }

  setAvatar(data, token) {
    return this._request(`/users/me/avatar`, {
      method: 'PATCH',
      headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
  }

  addCard(data, token) {
    return this._request(`/cards`, {
      method: 'POST',
      headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
  }

  addLike(cardId, token) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
  }

  removeLike(cardId, token) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
  }

  removeCard(cardId, token) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
  }

}

export const api = new Api({
  baseUrl: 'http://localhost:3000',
  // headers: {
  //   authorization: '03443a56-2e96-4faf-ad23-ecb69850558d',
  //   'Content-Type': 'application/json'
  // }
});
