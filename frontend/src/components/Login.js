import React from "react";

function Login({ handleLogin }) {
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
    handleLogin(userData);
    setUserData({
      email: "",
      password: "",
    });
  }

  return (
    <div className="entrance-page">
      <p className="entrance-page__title">Вход</p>
      <form
        onSubmit={handleSubmit}
        className="entrance-page__form"
        name="register"
      >
        <input
          className="entrance-page__change-line"
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
        ></input>
        <input
          className="entrance-page__change-line"
          type="password"
          name="password"
          placeholder="Пароль"
          value={userData.password}
          onChange={handleChange}
        ></input>
        <button className="entrance-page__button opacity-button">Войти</button>
      </form>
    </div>
  );
}

export default Login;
