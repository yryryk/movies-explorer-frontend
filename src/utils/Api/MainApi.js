class MainApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkExecution(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  async getUserInfo() {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    });
    return this._checkExecution(response);
  }

  async setUserInfo(inputValues) {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.about
      })
    });
    return this._checkExecution(response);
  }

  async getMovies() {
    const response = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    });
    return this._checkExecution(response);
  }

  async createMovie(data) {
    const response = await fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({...data})
    });
    return this._checkExecution(response);
  }

  async deleteMovie(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });
    return this._checkExecution(response);
  }

  setToken(JWT) {
    this._headers.authorization = `Bearer ${JWT}`
  }
}

const mainApi = new MainApi({
  baseUrl: 'https://api.movies.tovchennikov.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi
