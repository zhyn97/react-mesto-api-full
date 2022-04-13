class Api {
  constructor({ address }) {
    this.address = address;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка : ${res.status}`);
    }
  }

  _getToken=()=>{
    return localStorage.getItem("token");
  }

  getUserData() {
    return fetch(`${this.address}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this.address}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(this._checkResponse);
  }

  editUserData(name, about) {
    return fetch(`${this.address}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `${this._getToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  addNewCard(name, link) {
    return fetch(`${this.address}/cards`, {
      method: "POST",
      headers: {
        authorization: `${this._getToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this.address}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `${this._getToken}`,
      },
    }).then(this._checkResponse);
  }

  setLike(id) {
    return fetch(`${this.address}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: `${this._getToken}`,
      },
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return fetch(`${this.address}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: {
          authorization: `${this._getToken}`,
        },
      }).then(this._checkResponse);
    } else {
      return fetch(`${this.address}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: {
          authorization: `${this._getToken}`,
        },
      }).then(this._checkResponse);
    }
  }

  deleteLike(id) {
    return fetch(`${this.address}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `${this._getToken}`,
      },
    }).then(this._checkResponse);
  }

  newAvatar(link) {
    return fetch(`${this.address}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `${this._getToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  address: "https://api.nzhyburtovich.nomoredomains.work",
});

export default api;
