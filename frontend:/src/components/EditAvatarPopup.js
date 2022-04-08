import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  // function handleClick(e){
  //     console.log(e.target)
  //     if(e.target === 'popup popup-avatar popup_active'){
  //         props.onClose()
  //     }
  // }

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"popup-avatar"}
      buttonText={"Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        id="avatar-link"
        className="popup__change-line avatar-link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="avatar-link-error" className="error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
