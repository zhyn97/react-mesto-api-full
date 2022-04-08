function ImagePopup(props) {
  function check() {
    console.log(props.card.likes.length);
  }

  return (
    <div
      className={`popup popup_big-img ${
        !!props.card.name && !!props.card.link ? "popup_active" : ""
      }`}
    >
      <div className="popup__big-img-container">
        <button
          className="popup__close opacity-button"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          onClick={check}
          className="popup__big-img"
          src={props.card.link}
          alt={props.card.name}
        />
        <h2 className="popup__big-img-title">{props.card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
