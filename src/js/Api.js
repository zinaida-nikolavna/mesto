export default class Api {
  constructor(baseURL, token) {
    this.baseURL = baseURL;
    this.token = token;
  }
  getUserInfo() {
    return fetch(this.baseURL + 'users/me', {
      headers: {
        authorization: this.token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(() => Promise.reject(new Error("Не могу получить данные пользователя")));
  }

  getCards() {
    return fetch(this.baseURL + 'cards', {
      headers: {
        authorization: this.token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(() => Promise.reject(new Error("Не могу получить данные карточек")));
  }

  patchUserInfo(name, about) {
    this.name = name;
    this.about = about
    return fetch(this.baseURL + 'users/me', {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.name,
        about: this.about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(() => Promise.reject(new Error("Не могу обновить данные пользователя")));
  }

  postNewCard(nameCard, link) {
    this.nameCard = nameCard;
    this.link = link
    return fetch(this.baseURL + 'cards', {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.nameCard,
        link: this.link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(() => Promise.reject(new Error("Не могу опубликовать новую карточку")));
  }

  deleteCard(id) {
    return fetch(this.baseURL + `cards/` + id, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(() => Promise.reject(new Error("Не могу удалить карточку")));
  }

  putLike(id) {
    return fetch(this.baseURL + `cards/like/` + id, {
      method: 'PUT',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(() => Promise.reject(new Error("Не могу поставить лайк")));
  }

  deleteLike(id) {
    return fetch(this.baseURL + `cards/like/` + id, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(() => Promise.reject(new Error("Не могу удалить лайк")));
  }

  patchUserAvatar(avatar) {
    this.avatar = avatar;
    return fetch(this.baseURL + 'users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: this.avatar
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(() => Promise.reject(new Error("Не могу обновить аватар пользователя")));
  }
}

