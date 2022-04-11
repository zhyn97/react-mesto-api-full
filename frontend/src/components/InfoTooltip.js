import register_ok from "../images/register_ok.svg";
import register_bad from "../images/register_bad.svg";

function InfoTooltip(props) {

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
        <img className="info-tooltip__img" alt="статус регистрации" src={props.registerStatus ? register_ok : register_bad}/>
        <p className="info-tooltip__text">{props.registerStatus ? props.TextRegisterOk : props.TextRegisterBad}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
