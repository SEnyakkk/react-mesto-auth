export class AuthApi {
	constructor(baseUrl, headers) {
		this._url = baseUrl;
		this._headers = headers;
	}

	_isResOk = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)

	_request(endpoint, options, url = this._url) {
		return fetch(`${url}${endpoint}`, options)
			.then(this._isResOk)
	}

	registerUser(email, password) {
		return this._request('/signup', {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify({
				email,
				password
			})
		})
	}

	loginUser(email, password) {
		return this._request('/signin', {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify({
				email,
				password
			})
		})
	}

	checkToken(jwt) {
		return this._request('/users/me', {
			method: "GET",
			headers: this._headers,
			Authorization: `Bearer ${jwt}`,
		})
	}
}

export const authApi = new AuthApi({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});