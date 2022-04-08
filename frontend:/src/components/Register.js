import React from "react";
import { Link } from "react-router-dom";


function Register({handleRegister}) {
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(userData);
  }

  return (
    <div className="entrance-page">
      <p className="entrance-page__title">Регистрация</p>
      <form
        onSubmit={handleSubmit}
        className="entrance-page__form"
        name="register"
      >
        <input
          className="entrance-page__change-line"
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
        ></input>
        <input
          className="entrance-page__change-line"
          id="password"
          type="password"
          name="password"
          placeholder="Пароль"
          value={userData.password}
          onChange={handleChange}
        ></input>
        <button className="entrance-page__button opacity-button">
          Зарегистрироваться
        </button>
      </form>
      <p className="entrance-page__text">
        Уже зарегистрированы?{" "}
        <Link className="entrance-page__text opacity-button" to="/sign-in">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;
