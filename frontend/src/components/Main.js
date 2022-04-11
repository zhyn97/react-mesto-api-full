import React, { useContext } from "react";

import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div onClick={props.onEditAvatar} className="profile__avatar">
          <img
            className="profile__edit-view"
            src={currentUser.avatar}
            alt={"фото профиля"}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            onClick={props.onEditProfile}
            className="profile__edit-button opacity-button"
            type="button"
          ></button>
          <p className="profile__occupation">{currentUser.about}</p>
        </div>
        <button
          onClick={props.onAddPlace}
          className="profile__add-button opacity-button"
          type="button"
        ></button>
      </section>
      <section className="places">
        {props.cards.map((item) => (
          <Card
            onCardDelete={props.onCardDelete}
            onCardLike={props.onCardLike}
            key={item._id}
            {...item}
            card={item}
            onCardClick={props.onCardClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
