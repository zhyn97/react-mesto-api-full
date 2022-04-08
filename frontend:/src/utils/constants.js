export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const popups = document.querySelectorAll('.popup');
export const closeButtons = document.querySelectorAll('.popup__close');
export const formName = document.querySelector('.form-name');
export const formPlace = document.querySelector('.form-place');
export const nameField = document.querySelector('.profile__name');
export const occupationField = document.querySelector('.profile__occupation');
export const newName = document.querySelector('.popup__name');
export const newOccupation = document.querySelector('.popup__occupation');
export const popupEdit = document.querySelector('.popup-edit');
export const popupAdd = document.querySelector('.popup-add');
export const popupDelete = document.querySelector('.popup_delete-card');
export const newPlaceName = document.querySelector('.name-new-place');
export const newPlaceLink = document.querySelector('.link-new-place');
export const avatar = document.querySelector('.profile__avatar');
export const avatarImg = document.querySelector('.profile__edit-view');
export const popupAvatar = document.querySelector('.popup-avatar');
export const formAvatar = document.querySelector('.form-avatar');



export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
  
export const places = document.querySelector('.places');
export const template = document.querySelector('.template').content;
export const popupBigImg = document.querySelector('.popup_big-img');