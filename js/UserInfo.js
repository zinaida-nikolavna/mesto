class UserInfo {
  constructor(form, user, aboutUser, api, render, photo) {
    this.form = form;
    this.user = user;
    this.aboutUser = aboutUser;
    this.api = api;
    this.render = render;
    this.photo = photo;
    this.id = null;
    this.setEventListener();
  }

  updateUser() {
    this.api.getUserInfo()
      .then(data => {
        this.user.textContent = data.name;
        this.aboutUser.textContent = data.about;
        this.photo.setAttribute('style', `background-image: url(${data.avatar})`);
        this.form.username.value = data.name;
        this.form.aboutuser.value = data.about;
        this.id = data._id;
      })
      .catch(error => {
        console.log(error)
      })
  }

  getId() {
    return this.id;
  }

  setEventListener() {
    this.form.addEventListener('submit', (event) => this.submit(event));
  }

  submit(event) {
    event.preventDefault();
    this.render.render(true)
    this.setUserInfo(this.form.username.value, this.form.aboutuser.value);
  }

  setUserInfo(name, about) {
    this.name = name;
    this.about = about;
    this.api.patchUserInfo(name, about)
      .then(() => {
        this.form.username.value = name;
        this.form.aboutuser.value = about;
        this.updateUserInfo();
        this.render.render(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  updateUserInfo() {
    this.user.textContent = `${this.name}`;
    this.aboutUser.textContent = `${this.about}`;
  }
}