class AuthApi {
	constructor(baseUrl) {
		this._url = baseUrl;
	}

	_isResOk(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Статус ошибки: ${res.status}`);
	}

	_request(endpoint, options, url = this._url) {
		return fetch(`${url}${endpoint}`, options)
			.then(this._isResOk)
	}

	registerUser(email, password) {
		return this._request('/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email,
				password
			})
		})
	}


	loginUser(email, password) {
		return this._request('/signin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email,
				password
			})
		})
			.then((data) => {
				if (data.token) {
					localStorage.setItem('jwt', data.token);
					return data;
				}
			})
	}


	checkJwt(token) {
		return this._request('/users/me', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
		})
	}
}

export const authApi = new AuthApi('http://localhost:3000');