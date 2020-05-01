class RenderLoading {
    constructor(btnSave, popup) {
        this.btnSave = btnSave;
        this.popup = popup
    }
    render(type) {
        if (type) {
            return this.btnSave.textContent = 'Загрузка...'
        } else {
            this.popup.classList.remove('popup_is-opened');
            this.btnSave.textContent = 'Сохранить';
        }
    }
}