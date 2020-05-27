export default class Popup {
    constructor(popup, btnOpen, btnClose) {
        this.popup = popup;
        this.btnOpen = btnOpen;
        this.btnClose = btnClose;
        this.setEventListeners();
    }

    setEventListeners() {
        this.btnOpen.addEventListener('click', this.open.bind(this.popup));
        this.btnClose.addEventListener('click', this.close.bind(this.popup));
    }

    open() {
        this.classList.add('popup_is-opened');
    }

    close() {
        this.classList.remove('popup_is-opened');
        this.querySelectorAll('.input-container').forEach(function (item) {
            item.classList.remove('input-container__invalid');
        });
    }
    closeImage(popupImage) {
        this.popupImage = popupImage
        this.querySelectorAll('.popup__image').forEach(item => {
            item.classList.remove('popup_is-opened');
        })
    }
}