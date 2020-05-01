class Card {
  constructor(name, link, popup, likes, idCard, idOwner, api, idUser) {
    this.name = name;
    this.link = link;
    this.popup = popup;
    this.likes = likes;
    this.idCard = idCard;
    this.idOwner = idOwner;
    this.api = api;
    this.idUser = idUser;
    this.like = this.like.bind(this);
    this.openImage = this.openImage.bind(this.popup);
    this.remove = this.remove.bind(this);
    this.closeImage = this.closeImage.bind(this.popup);
  }

  create() {

    const placeCard = document.createElement('div');
    const image = document.createElement('div');
    const description = document.createElement('div');
    const cardName = document.createElement('h3');
    const likeIcon = document.createElement('button');
    const counter = document.createElement('div');
    const likesContainer = document.createElement('div');

    placeCard.classList.add('place-card');
    image.classList.add('place-card__image');
    image.setAttribute('style', `background-image: url(${this.link})`)
    description.classList.add('place-card__description');
    cardName.classList.add('place-card__name');
    cardName.textContent = this.name;
    likeIcon.classList.add('place-card__like-icon');
    counter.classList.add('place-card__counter');
    likesContainer.classList.add('place-card__likes-container');
    counter.textContent = this.likes.length;

    this.likes.forEach(item => {
      if (item._id === this.idUser) {
        likeIcon.classList.add('place-card__like-icon_liked');
      }
    });

    placeCard.appendChild(image);
    placeCard.appendChild(description);
    description.appendChild(cardName);
    description.appendChild(likesContainer);
    likesContainer.appendChild(likeIcon)
    likesContainer.appendChild(counter);
    if (this.idOwner === this.idUser) {
      const deleteIcon = document.createElement('button');
      deleteIcon.classList.add('place-card__delete-icon');
      image.appendChild(deleteIcon);
    }

    this.card = placeCard;
    this.setEventListeners()
    return placeCard;
  };

  setEventListeners() {
    this
      .card
      .querySelector('.place-card__like-icon')
      .addEventListener('click', this.like);

    this
      .card
      .querySelector('.place-card__image')
      .addEventListener('click', this.openImage);

    if (this.card.querySelector('.place-card__delete-icon') !== null) {
      this
        .card
        .querySelector('.place-card__delete-icon')
        .addEventListener('click', this.remove);
    }

    this
      .popup
      .querySelector('#close_image')
      .addEventListener('click', this.closeImage);
  }

  like(event) {
    if (event.target.className == 'place-card__like-icon place-card__like-icon_liked') {
      this.api.deleteLike(this.idCard)
        .then(data => {
          this.card.querySelector('.place-card__counter').textContent = data.likes.length;
          event.target.classList.remove('place-card__like-icon_liked')
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      this.api.putLike(this.idCard)
        .then(data => {
          this.card.querySelector('.place-card__counter').textContent = data.likes.length;
          event.target.classList.add('place-card__like-icon_liked')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  remove(event) {
    if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
      this.api.deleteCard(this.idCard)
        .then(() => {
          this.card.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
          this.card.querySelector('.place-card__image').removeEventListener('click', this.openImage);
          this.card.querySelector('.place-card__delete-icon').removeEventListener('click', this.remove);
          this.popup.querySelector('#close_image').removeEventListener('click', this.closeImage);
          this.card.remove();
          event.stopPropagation();
        })
        .catch(error => {
          console.log(error)
        })
    }
    event.stopPropagation();
  }

  openImage(event) {
    this.classList.add('popup_is-opened');
    const srcImage = event.target.style.backgroundImage.slice(5, -2);
    const popupImg = this.querySelector('.popup__image_open');
    popupImg.src = srcImage;
  }

  closeImage() {
    this.classList.remove('popup_is-opened');
  }
};