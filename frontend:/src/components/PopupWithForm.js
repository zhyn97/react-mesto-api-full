function PopupWithForm(props) {
  return (
    <div
      className={`popup ${props.name} ${props.isOpen ? "popup_active" : ""}`}
    >
      <div className={"popup__container"}>
        <button
          className={"popup__close opacity-button"}
          type={"button"}
          onClick={props.onClose}
        ></button>
        <p className={"popup__title"}>{props.title}</p>
        <form className={"popup__form form-name"} name={"name-data"} noValidate onSubmit={props.onSubmit}>
          {props.children}
          <button className={"popup__save-button"} type={"submit"}>
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
