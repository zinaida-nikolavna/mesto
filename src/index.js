import "./index.css";

import Api from './js/Api.js';
import Card from './js/Card.js';
import CardList from './js/CardList.js';
import FormValidator from './js/FormValidator.js';
import Popup from './js/Popup.js';
import RenderLoading from './js/RenderLoading.js';
import UserAvatar from './js/UserAvatar.js';
import UserInfo from './js/UserInfo.js';

const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort10/' : 'https://praktikum.tk/cohort10/';
// объявление переменных
// формы
const formUserCard = document.forms.add;
const formEdit = document.forms.userProfile;
const formUserAvatar = document.forms.avatar;
// для открытия попапа для добавления карточки
const popupAddCard = document.querySelector('#popup-createCard');
const btnAdd = document.querySelector('.user-info__button');
const closeAdd = document.querySelector('#close_createCard');
const btnSaveAdd = document.querySelector('#btn_save');
// для открытия попапа для редактирования профиля
const popupEditCard = document.querySelector('#popup-editProfile');
const btnEdit = document.querySelector('.user-info__btn-edit');
const closeEdit = document.querySelector('#close_editProfile');
const btnSaveEdit = document.querySelector('#btn_editProfile');
// для открытия попапа для редактирования аватара пользователя
const popupUserAvatar = document.querySelector('#popup-userAvatar');
const userAvatar = document.querySelector('.user-info__photo');
const closeUserAvatar = document.querySelector('#close_userAvatar');
const btnSaveAvatar = document.querySelector('#btn_avatar');
// для открытия попапа с картинкой
const popupImage = document.querySelector('.popup__image');
// контейнер с карточками
const placesList = document.querySelector('.places-list')
// для редактирования профиля
const userName = document.querySelector('.user-info__name');
const userAbout = document.querySelector('.user-info__job');
const userPhoto = document.querySelector('.user-info__photo');
// корневый контейнеры формы попапа
const popupFormAdd = document.querySelector('#popup__form_addCard');
const popupFormEdit = document.querySelector('#popup__form_edit');
const popupFormAvatar = document.querySelector('#popup__form_userAvatar');
// контейнер
const cardContainer = new CardList(placesList);

//создаем экземпляры классов
const api = new Api(serverUrl, 'b9a3a21d-fe30-4080-88da-a3de534f7e53');
const renderLoadingCard = new RenderLoading(btnSaveAdd, popupAddCard);
const renderLoadingUser = new RenderLoading(btnSaveEdit, popupEditCard);
const renderLoadingAvatar = new RenderLoading(btnSaveAvatar, popupUserAvatar)
const validatorCard = new FormValidator(formUserCard, Array.from(formUserCard.elements), popupFormAdd);
const validatorAvatar = new FormValidator(formUserAvatar, Array.from(formUserAvatar.elements), popupFormAvatar);
const user = new UserInfo(formEdit, userName, userAbout, api, renderLoadingUser, userPhoto);

//получаем данные о пользователе с сервера
user.updateUser();

// перебор массива для создания массива с карточками
const cardElement = [];
api.getCards()
  .then((data) => {
    data.forEach(item => {
      cardElement.push(new Card(item.name, item.link, popupImage, item.likes, item._id, item.owner._id, api, user.getId()).create());
      return cardElement
    });
    cardContainer.render(cardElement);
  })
  .catch(error => {
    console.log(error)
  })


//добавляем новую карточку
formUserCard.addEventListener('submit', getDataCard);
function getDataCard(event) {
  event.preventDefault();
  renderLoadingCard.render(true)
  const name = formUserCard.elements.name;
  const link = formUserCard.elements.link;
  api.postNewCard(name.value, link.value)
    .then(data => {
      const userCard = new Card(data.name, data.link, popupImage, data.likes, data._id, data.owner._id, api, user.getId()).create()
      cardContainer.addCard(userCard);
      renderLoadingCard.render(false);
      formUserCard.reset();
      validatorCard.setSubmitButtonState(btnSaveAdd, false);
    })
    .catch(error => {
      console.log(error)
    })
}

// открываем/закрываем попап для добавления новой карточки
new Popup(popupAddCard, btnAdd, closeAdd);
// открываем/закрываем попап для редактирования профиля
new Popup(popupEditCard, btnEdit, closeEdit);
// открываем/закрываем попап с редактированием аватара пользователя
new Popup(popupUserAvatar, userAvatar, closeUserAvatar);
// редактирование аватара пользователя
new UserAvatar(formUserAvatar, userAvatar, api, validatorAvatar, btnSaveAvatar, renderLoadingAvatar)
// валидация
new FormValidator(formEdit, Array.from(formEdit.elements), popupFormEdit);