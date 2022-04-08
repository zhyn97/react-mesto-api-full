import { Link } from "react-router-dom";

function MobileMenu({ signOut, isOpen, email }) {
  return (
    <div className={`mobile-menu ${isOpen ? "mobile-menu_active" : ""}`}>
      <p className="mobile-menu__text">{email}</p>
      <Link
        className="mobile-menu__link opacity-button"
        to="/sign-in"
        onClick={signOut}
      >
        Выйти
      </Link>
    </div>
  );
}

export default MobileMenu;
