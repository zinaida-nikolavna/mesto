export default class UserAvatar {
    constructor(form, photo, api, validator, button, render) {
        this.form = form;
        this.photo = photo;
        this.api = api;
        this.validator = validator;
        this.button = button;
        this.render = render;
        this.setEventListener();
    }

    setEventListener() {
        this.form.addEventListener('submit', (event) => this.submit(event));
    }

    submit(event) {
        event.preventDefault();
        this.render.render(true);
        this.setUserInfo(this.form.avatar.value);
    }

    setUserInfo(avatar) {
        this.avatar = avatar;
        this.api.patchUserAvatar(avatar)
            .then(() => {
                this.updateUserInfo();
                this.render.render(false);
            })
            .catch(error => {
                console.log(error)
            })
    }

    updateUserInfo() {
        this.photo.setAttribute('style', `background-image: url(${this.avatar})`)
        this.form.reset();
        this.validator.setSubmitButtonState(this.button, false);
    }
}