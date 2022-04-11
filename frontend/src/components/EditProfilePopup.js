import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleName(e) {
    setName(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"popup-edit"}
      buttonText={"Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="name"
        className="popup__name popup__change-line"
        type="text"
        name="name"
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        required
        onChange={handleName}
        value={name || ""}
      />
      <span id="name-error" className="error"></span>
      <input
        id="occupation"
        className="popup__occupation popup__change-line"
        type="text"
        name="about"
        minLength="2"
        maxLength="200"
        placeholder="Занятие"
        required
        onChange={handleDescription}
        value={description || ""}
      />
      <span id="occupation-error" className="error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
