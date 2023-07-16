class AuthApi {
	constructor(baseUrl) {
		this._url = baseUrl;
		// this._headers = headers;
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
		// return fetch(`${this._url}/signup`, {
		// 	method: 'POST',
		// 	headers: {
		// 	  "Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify({ email, password })
		//   }).then((res) => this._isResOk(res));
		// }
		return this._request('/signup', {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email,
				password
			})
		})
	}


	loginUser(email, password) {
		return this._request('/signin', {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email,
				password
			})
		})
		// .then((data) => {
		// 	if (data.jwt) {
		// 		localStorage.setItem('jwt', data.jwt);
		// 		return data;
		// 	}
		// })
	}


	checkToken(jwt) {
		return this._request('/users/me', {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${jwt}`,
			},
		})
	}
}

export const authApi = new AuthApi('https://auth.nomoreparties.co');