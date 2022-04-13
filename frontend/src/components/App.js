import React from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { register, authorize, checkToken } from "../utils/auth";
import InfoTooltip from "./InfoTooltip";
import MobileMenu from "./MobileMenu";
import NotFound from "./NotFound";

function App() {
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] =
    React.useState(false);
  const [isMobileMenu, setIsMobileMenu] = React.useState(false)
  const [width, setWidth] = React.useState(window.innerWidth);
  const [registerStatus, setRegisterStatus] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const history = useHistory();


  function openMobileMenu() {
    setIsMobileMenu(true);
  }

  function closeMobileMenu() {
    setIsMobileMenu(false);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser({ name, about }) {
    api
      .editUserData(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .newAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard(name, link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function getCards() {
    api
      .getCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleRegister(userData) {
    if (!userData.email || !userData.password) {
      return;
    }
    register(userData.email, userData.password)
      .then((res) => {
        history.push("./sign-in");
        setRegisterStatus(true);
        setIsInfoTooltipPopupOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setRegisterStatus(false);
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleLogin(userData) {
    if (!userData.email || !userData.password) {
      return;
    }
    authorize(userData.email, userData.password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => console.log(err));
  }

  function signOut() {
    localStorage.removeItem("token");
    setIsMobileMenu(false);
  }

  function handleResize() {
    setWidth(window.innerWidth);
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  // React.useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     const token = localStorage.getItem("token");
  //     checkToken(token).then((res) => {
  //       if (res) {
  //         setEmail(res.data.email);
  //         setLoggedIn(true);
  //         history.push("/");
  //         console.dir(res);
  //       }
  //     });
  //   }
  // }, []);

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      checkToken(token).then((res) => {
        if (res) {
          setEmail(res.email);
          setLoggedIn(true);
          history.push("/");
        }
      });
    }
  }, []);

  React.useEffect(() => {
    getCards();
  }, []);

  React.useEffect(() => {
    api
      .getUserData()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <MobileMenu signOut={signOut} isOpen={isMobileMenu} email={email} />
        <Header signOut={signOut} email={email} width={width} closeMobileMenu={closeMobileMenu} openMobileMenu={openMobileMenu} isMobileMenu={isMobileMenu} />

        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
            />
            <Footer />
          </ProtectedRoute>

          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>

          <Route path="/sign-up">
            <Register handleRegister={handleRegister} />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onCardAdd={handleAddPlaceSubmit}
        />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          TextRegisterOk={"Вы успешно зарегистрировались!"}
          TextRegisterBad={"Что-то пошло не так! Попробуйте ещё раз."}
          registerStatus={registerStatus}
        />

        <PopupWithForm
          title={"Вы уверены?"}
          name={"popup_delete-card"}
          buttonText={"Да"}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
